import { db } from "@/db/connect"; // your drizzle instance
import {
    accounts,
    sessions,
    users,
    verifications
} from "@/db/schema";
import {
    betterAuth
} from 'better-auth';
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            users,
            sessions,
            accounts,
            verifications
        },
        //if all of them are just using plural form, you can just pass the option below
        usePlural: true
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60 // Cache duration in seconds
        }
    },
    emailAndPassword: {
        enabled: true,
        // async sendResetPassword(data, request) {
        // Send an email to the user with a link to reset their password
        // },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }
    },

  plugins: [nextCookies()] 

});


export type Session = typeof auth.$Infer.Session
