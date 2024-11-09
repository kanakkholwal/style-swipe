import { z } from "zod";

const envVariables = z.object({
    // Server Side
    GOOGLE_ID: z.string(),
    GOOGLE_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXT_AUTH_SECRET: z.string(),
    MONGODB_URI: z.string(),
    NODE_ENV: z.string().default("testing"),
    MAIL_EMAIL: z.string(),
    MAIL_PASSWORD: z.string(),
    WEBSITE_NAME: z.string(),
    WEBSITE_DOMAIN: z.string(),
    WEBSITE_URL: z.string(),
    JWT_SECRET: z.string(),

    // Client Side
    NEXT_PUBLIC_WEBSITE_NAME: z.string(),
    NEXT_PUBLIC_WEBSITE_URL: z.string(),
    NEXT_PUBLIC_ENV: z.string(),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: z.string(),
    NEXT_PUBLIC_CLOUDINARY_FOLDER: z.string(),
    NEXT_PUBLIC_GUMROAD_APP_ID: z.string(),
});

envVariables.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envVariables> { }
    }
}
