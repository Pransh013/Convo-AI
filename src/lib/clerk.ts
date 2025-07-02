"use server";

import { auth } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const { userId, redirectToSignIn } = await auth();
  
  if (!userId) redirectToSignIn();

  return { userId };
}
