"use client";

import { useState } from "react";
//import useRouter from "react";

import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

import { ChevronRight } from "lucide-react";


export default function Dashboard(props: {profileName: string, avatar: string}) {
  return (
    <>
      <div className="grid items-center justify-items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center justify-items-center sm:items-start">
          <h1>Welcome, {props.profileName}</h1>
        </main>
      </div>
    </>
  );
}
