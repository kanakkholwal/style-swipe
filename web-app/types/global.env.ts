import { z } from "zod";

const envVariables = z.object({
  // Server Side
  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),

  GCP_PROJECT_ID: z.string(),
  GCP_LOCATION_ID: z.string(),
  GCP_AI_API_ENDPOINT: z.string(),
  // Google
  GOOGLE_VERTEX_PROJECT: z.string(),
  GOOGLE_VERTEX_LOCATION: z.string(),
  GOOGLE_CLIENT_EMAIL: z.string(),
  GOOGLE_PRIVATE_KEY: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOOGLE_AUTH_TOKEN: z.string(),
  

  NODE_ENV: z.string().default("testing"),
  MAIL_EMAIL: z.string(),
  MAIL_PASSWORD: z.string(),

  // Client Side
  NEXT_PUBLIC_APP_URL: z.string(),
  NEXT_PUBLIC_WEBSITE_NAME: z.string(),
  NEXT_PUBLIC_WEBSITE_URL: z.string(),
  NEXT_PUBLIC_ENV: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
