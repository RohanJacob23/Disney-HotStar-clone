import Link from "next/link";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <main className=" text-white">
        <h1 className="text-4xl">Welcome to home page</h1>
        {session ? (
          <Link href="/movies" className="text-3xl hover:underline">
            Explore Movies
          </Link>
        ) : (
          <Link href="/auth/signin" className="text-3xl hover:underline">
            SignIn
          </Link>
        )}
      </main>
    </>
  );
}
