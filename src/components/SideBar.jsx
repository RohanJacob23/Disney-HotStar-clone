import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.svg";
import {
  IconUserCircle,
  IconSearch,
  IconHome2,
  IconDeviceTv,
  IconBallFootball,
  IconLogout,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";

export default function SideBar() {
  const { data: session, status } = useSession();
  const iconColor = "#7777ff";
  const iconSize = "1.5rem";
  const allIcon = [
    { id: 1, icon: <IconUserCircle size={iconSize} color={iconColor} /> },
    { id: 2, icon: <IconSearch size={iconSize} color={iconColor} /> },
    { id: 3, icon: <IconHome2 size={iconSize} color={iconColor} /> },
    { id: 4, icon: <IconDeviceTv size={iconSize} color={iconColor} /> },
    { id: 5, icon: <IconBallFootball size={iconSize} color={iconColor} /> },
  ];
  return (
    <>
      <div className="fixed top-0 flex flex-col items-center justify-between h-full py-4 md:py-6 pl-1 md:pl-4">
        {/* logo div */}
        <div className="relative w-20 h-20">
          <Image src={logo} fill className="object-contain" alt="image" />
        </div>

        {/* icon section */}
        <div className="flex flex-col gap-5 my-1 md:my-3">
          {allIcon.map((item) => (
            <div
              key={item.id}
              className="hover:bg-[#7777ff]/20 rounded-lg cursor-pointer p-3 mb-2 hover:scale-110 transition-transform delay-100 ease-out"
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* logout section */}
        {session ? (
          <div
            className="hover:bg-[#7777ff]/20 rounded-lg cursor-pointer p-3 hover:scale-110 transition-transform delay-100 ease-out"
            onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
          >
            <IconLogout size={iconSize} color={iconColor} />
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="text-xl text-white cursor-pointer"
          >
            SignIn
          </Link>
        )}
      </div>
    </>
  );
}
