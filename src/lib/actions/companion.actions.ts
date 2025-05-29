"use server";

import { CompanionFormValues } from "@/schemas";
import { createSupabaseClient } from "../supabase";
import { getCurrentUser } from "../clerk";
import { CompanionRecord } from "@/types";

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
  return data[0];
};
