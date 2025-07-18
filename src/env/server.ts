import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
