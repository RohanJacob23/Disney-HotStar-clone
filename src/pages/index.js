import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="">
      <h1 className="text-4xl text-white">Welcome to home page</h1>
      <Link href="/movies">Explore Movies</Link>
    </main>
  );
}
