"use client";

import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import {
  CallStatus,
  CompanionSessionData,
  Message,
  SavedMessage,
} from "@/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { Button } from "./ui/button";
import { Mic, MicOff } from "lucide-react";
import { addToSessionHistory } from "@/lib/actions/companion.actions";

const CompanionSession = ({
  id: companionId,
  name,
  subject,
  topic,
  style,
  voice,
  userName,
  userImage,
}: CompanionSessionData) => {
  const [callStatus, setCallStatus] = useState(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: unknown) => console.error("VAPI Error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  const toggleMicrophone = () => {
    const currentMutedState = vapi.isMuted();
    vapi.setMuted(!currentMutedState);
    setIsMuted(!currentMutedState);
  };

  const handleConnect = () => {
    setCallStatus(CallStatus.CONNECTING);

    try {
      const assistantOverrides = {
        variableValues: { subject, topic, style },
        clientMessages: ["transcript"],
        serverMessages: [],
      };

      //@ts-expect-error
      vapi.start(configureAssistant(voice, style), assistantOverrides);
    } catch (error) {
      console.error("Failed to start VAPI call:", error);
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = () => {
    try {
      setCallStatus(CallStatus.FINISHED);
      vapi.stop();
    } catch (error) {
      console.error("Failed to stop VAPI call:", error);
    }
  };

  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div className={cn("companion-avatar", getSubjectColor(subject))}>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === CallStatus.CONNECTING &&
                  "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000 ",
                callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                animationData={soundwaves}
                lottieRef={lottieRef}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl">{userName}</p>
          </div>
          <div className="flex gap-4 w-full">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
              className="cursor-pointer"
            >
              {isMuted ? (
                <MicOff className="text-gray-600" />
              ) : (
                <Mic className="text-gray-600" />
              )}
            </Button>
            <Button
              onClick={
                callStatus === CallStatus.ACTIVE
                  ? handleDisconnect
                  : handleConnect
              }
              className={cn(
                "py-2 cursor-pointer transition-colors flex-1 text-white",
                callStatus === CallStatus.ACTIVE ? "bg-red-700" : "bg-primary",
                callStatus === CallStatus.CONNECTING && "animate-pulse"
              )}
            >
              {callStatus === CallStatus.ACTIVE
                ? "End Session"
                : callStatus === CallStatus.CONNECTING
                ? "Connecting"
                : "Start Session"}
            </Button>
          </div>
        </div>
      </section>

      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => (
            <p
              key={index}
              className={cn(
                "max-sm:text-sm",
                message.role !== "assistant" && "text-primary"
              )}
            >
              {message.role === "assistant"
                ? `${name.split(" ")[0].replace(/[.,]/g, ", ")}: `
                : `${userName}: `}
              {message.content}
            </p>
          ))}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionSession;
