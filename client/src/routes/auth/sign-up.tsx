import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  const [email, setEmail] = useState("benoitcournault@gmail.com");
  const [password, setPassword] = useState("password");

  const handleSignUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name: "New User",
      },
      {
        onRequest: () => {
          // Show loading spinner
        },
        onSuccess: () => {
          // Redirect to dashboard
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}
