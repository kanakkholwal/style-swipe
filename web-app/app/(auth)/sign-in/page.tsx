"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try{
    setLoading(true);
    await signIn.email({ email, password });
    }catch(e){
      if(e instanceof Error){
        console.error(e.message);
        toast.error(e.message);
      }else{
        console.error(e);
        toast.error("An error occurred. Please try again later.");
      }
    }finally{
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="#"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              placeholder="password"
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>





          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Login"
            )}
          </Button>



          <div className={cn(
            "w-full gap-2 flex items-center",
            "justify-between flex-col"
          )}>
            <Button
              variant="outline"
              className={cn(
                "w-full gap-2"
              )}
              onClick={async () => {
                await signIn.social({
                  provider: "google",
                  callbackURL: "/app"
                });
              }}
            >
              <FcGoogle/>
              Sign in with Google
            </Button>
          </div>
        </div>
      </CardContent>

    </Card>
  );
}