"use client";
import { Stack } from "@mui/material";
import Link from "next/link";

export default function Home() {
  const menus = [
    {
      link: "login",
      title: "Login",
    },
    {
      link: "signUp",
      title: "Sign Up",
    },
  ];
  return (
    <Stack direction={"row"} gap={"15px"}>
      {menus.map((menu, index) => {
        return (
          <Link key={menu.link + index} href={menu.link}>
            {menu.title}
          </Link>
        );
      })}
    </Stack>
  );
}
