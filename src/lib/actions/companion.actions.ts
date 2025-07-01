"use server";

import { createSupabaseClient } from "../supabase";
import { getCurrentUser } from "../clerk";
import {
  CompanionFormValues,
  CompanionRecord,
  GetAllCompanions,
} from "@/types";

export const createCompanion = async (
  formData: CompanionFormValues
): Promise<CompanionRecord> => {
  const { userId } = await getCurrentUser();
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
}: GetAllCompanions): Promise<CompanionRecord[]> => {
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();
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

  const { data: companions, error } = await query;
  if (error) throw new Error(error.message);
  return companions as CompanionRecord[];
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
  const { userId } = await getCurrentUser();
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
): Promise<CompanionRecord[]> => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data.map(
    ({ companions }) => companions
  ) as unknown as CompanionRecord[];
};

export const getUserSessions = async (limit = 10) => {
  const { userId } = await getCurrentUser();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ companions }) => companions);
};
