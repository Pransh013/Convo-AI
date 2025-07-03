"use server";

import { createSupabaseClient } from "../supabase";
import {
  CompanionFormValues,
  CompanionRecord,
  CompanionWithBookmark,
  GetAllCompanions,
  RawCompanionWithBookmarks,
  SessionHistoryRecord,
} from "@/types";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export const createCompanion = async (
  formData: CompanionFormValues
): Promise<CompanionRecord> => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) redirectToSignIn();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author: userId })
    .select();

  if (!data || error) {
    throw new Error(error.message || "Failed to create a companion");
  }
  return data[0] as CompanionRecord;
};

export const getAllCompanions = async ({
  subject,
  topic,
  limit = 10,
  page = 1,
}: GetAllCompanions): Promise<CompanionWithBookmark[]> => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) redirectToSignIn();
  const supabase = createSupabaseClient();

  let query = supabase
    .from("companions")
    .select("*, bookmarks(user_id)")
    .order("created_at", { ascending: false });

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  const companions = (data as RawCompanionWithBookmarks[]).map((companion) => ({
    id: companion.id,
    name: companion.name,
    style: companion.style,
    subject: companion.subject,
    voice: companion.voice,
    topic: companion.topic,
    duration: companion.duration,
    author: companion.author,
    created_at: companion.created_at,
    isBookmarked:
      companion.bookmarks?.some((b) => b.user_id === userId) || false,
  }));
  return companions as CompanionWithBookmark[];
};

export const getCompanion = async (id: string): Promise<CompanionRecord> => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data[0] as CompanionRecord;
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) redirectToSignIn();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (
  limit = 10
): Promise<SessionHistoryRecord[]> => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`id, companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ id, companions }) => ({
    sessionId: id,
    companion: companions,
  })) as unknown as SessionHistoryRecord[];
};

export const getUserSessions = async (
  userId: string,
  limit = 10
): Promise<SessionHistoryRecord[]> => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`id, companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ id, companions }) => ({
    sessionId: id,
    companion: companions,
  })) as unknown as SessionHistoryRecord[];
};

export const getUserCompanions = async (
  userId: string
): Promise<CompanionRecord[]> => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data as CompanionRecord[];
};

export const addBookmark = async (
  companionId: string,
  pathname: string
): Promise<void> => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) redirectToSignIn();
  const supabase = createSupabaseClient();

  const { error } = await supabase.from("bookmarks").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);
  revalidatePath(pathname);
};

export const removeBookmark = async (
  companionId: string,
  pathname: string
): Promise<void> => {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) redirectToSignIn();
  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("companion_id", companionId);

  if (error) throw new Error(error.message);
  revalidatePath(pathname);
};

export const getBookmarkedCompanions = async (
  userId: string
): Promise<CompanionRecord[]> => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data.map(({ companions }) => companions as unknown as CompanionRecord);
};

export const newCompanionPermissions = async () => {
  const { userId, redirectToSignIn, has } = await auth();
  if (!userId) redirectToSignIn();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_active_companions" })) {
    limit = 3;
  } else if (has({ feature: "10_active_companions" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data.length;
  if (companionCount >= limit) return false;
  return true;
};
