"use client";
import { Next13ProgressBar } from "next13-progressbar";
export default function ClientProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>
            <Next13ProgressBar
          height="4px"
          color="hsl(var(--primary))"
          options={{ showSpinner: true, trickle: true }}
          showOnShallow={true}
        />
            {children}
    </>
}