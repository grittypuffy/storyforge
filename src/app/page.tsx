"use client";
import Database, { QueryResult } from "@tauri-apps/plugin-sql";
import { window } from '@tauri-apps/api';

const { appWindow: any } = window;

import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";

import { ChevronRight } from "lucide-react";
//import { useRouter } from "next/router";

let db = await Database.load("sqlite:storyforge.db");

export default async function Landing() {
  const [avatar, setAvatar] = ["/avatar.png", (avatar: string) => (avatar = avatar)]  // Default image path
  //const router = useRouter();
  // Handle file selection and preview the avatar
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string); // Set the selected image as the new source
      };
      reader.readAsDataURL(file);
    }
  };

  const createProfile = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const profileName = formData.get('profile-name');
    const avatar = formData.get('avatar');

    if (profileName) {
      let queryResult = await db?.select(
        "SELECT profile_name from profile where profile_name = $1",
        [profileName]
      );
      if (queryResult) {
        console.log(queryResult);
      } else {
        console.log(queryResult);
        await db
          ?.execute(
            "INSERT INTO profile (profile_name, avatar) VALUES ($1, $2)",
            [profileName, avatar]
          )
          .then((queryResult) => {
            if (queryResult) {
              router.push("/dashboard");
            }
          });
      }
    }
  };

  return (
    <>
      <div className="grid items-center justify-items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center justify-center justify-items-center sm:items-start">
          <h1 className="text-5xl font-medium">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-green-500">
              StoryForge
            </span>
          </h1>
          <h3 className="text-2xl font-medium">
            Create a profile to get started
          </h3>
          <form>
            <div className="relative cursor-pointer grid justify-items-center justify-center items-center">
              <label
                htmlFor="avatar"
                className="flex flex-col gap-8 row-start-2 items-center justify-center justify-items-center sm:items-start"
              >
                <Avatar
                  id="avatar"
                  src={avatar}
                  alt="Avatar"
                  className="mx-40 w-36 h-36 rounded-full object-cover transition-all hover:border-green-500"
                />
                <input
                  type="file"
                  id="avatar"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <Input
              type="text"
              label="profile-name"
              placeholder="Enter your profile name"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-black/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-50/50",
                  "dark:bg-default/20",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-100/70",
                  "dark:hover:bg-default/30",
                  "group-data-[focus=true]:bg-default-200/50",
                  "dark:group-data-[focus=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              isRequired
            />
            <div className="flex row-start-3 flex-wrap items-end justify-end">
              <Button
                color="primary"
                endContent={<ChevronRight />}
                className=""
                onClick={createProfile}
              >
                Next
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
