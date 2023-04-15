import React from "react";
import Head from "next/head";
import SignInComp from "@/components/SignInComp";

export default function signin() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <SignInComp />
    </>
  );
}
