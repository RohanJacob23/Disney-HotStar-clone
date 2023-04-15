import React, { useState } from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

export default function SignInComp() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    signIn("google", { callbackUrl: "http://localhost:3000/movies" });
    setLoading(true);
  };
  return (
    <div className="w-40 h-40 m-auto">
      <Button
        leftIcon={<IconBrandGoogle />}
        isLoading={loading}
        loadingText="Signing In"
        onClick={handleClick}
      >
        SignIn with Google
      </Button>
    </div>
  );
}
