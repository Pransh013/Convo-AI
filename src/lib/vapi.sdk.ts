import { env } from "@/env/client";
import Vapi from "@vapi-ai/web";

export const vapi = new Vapi(env.NEXT_PUBLIC_VAPI_WEB_TOKEN);
