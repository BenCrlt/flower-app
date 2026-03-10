import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  const isValidForm = username.trim().length > 0 && pin.length === 6;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidForm) return;

    authClient.signIn.username({
      username,
      password: pin,
    });
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left panel */}
      <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-primary lg:flex">
        <div className="relative z-10 flex flex-col items-center gap-4 px-12 text-center">
          <p
            className="text-6xl leading-tight text-primary-foreground"
            style={{ fontFamily: '"Martin Demo", serif' }}
          >
            FLOWER MUSIC FESTIVAL
          </p>
          <p
            className="text-3xl leading-tight text-primary-foreground"
            style={{ fontFamily: '"Akira Expanded", serif' }}
          >
            ADMIN PANEL
          </p>
        </div>
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/5" />
      </div>

      {/* Right panel — form */}
      <div className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Mobile heading */}
          <div className="flex flex-col items-center gap-4 mb-4 lg:hidden">
            <p
              className="text-center text-3xl text-foreground"
              style={{ fontFamily: '"Martin Demo", serif' }}
            >
              FLOWER MUSIC FESTIVAL
            </p>
            <p
              className="text-center text-xl text-foreground"
              style={{ fontFamily: '"Akira Expanded", serif' }}
            >
              ADMIN PANEL
            </p>
          </div>

          <h1 className="mb-2 text-2xl font-semibold tracking-tight">
            Connexion
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Entrez votre identifiant et votre code PIN.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Identifiant</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Code PIN</Label>
              <InputOTP maxLength={6} value={pin} onChange={setPin}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button type="submit" className="w-full" disabled={!isValidForm}>
              Se connecter
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
