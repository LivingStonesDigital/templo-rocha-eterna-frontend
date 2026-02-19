"use client";
import { cn } from "@/lib/utils";
import { IconCake, IconHome, IconSettings, IconUser, IconUsers } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    url: "/",
    icon: IconHome,
  },
  
  {
    name: "Membros",
    url: "/membros",
    icon: IconUsers,
  },
  {
    name: "Birthday",
    url: "/aniversariantes",
    icon: IconCake,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: IconSettings,
  },
];

function BottomBar() {
  const pathname = usePathname();

  return (
    <div className="w-[calc(100%-4rem)] z-10 sticky bottom-8 h-14 shadow-lg rounded-full bg-zinc-900 flex items-center justify-around gap-4 mx-auto">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          className={cn("flex flex-col items-center gap-1", pathname === link.url ? "text-primary" : "text-gray-400")}
        >
          <link.icon className="size-6 " />
          {/* <span className="text-xs text-white">{link.name}</span> */}
        </Link>
      ))}
    </div>
  );
}

export default BottomBar;
