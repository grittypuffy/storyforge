"use client";

import Database from "@tauri-apps/plugin-sql";

import { Suspense, useEffect } from "react";
import { Profile } from "@/utils/profile/query";
import { useRouter } from "next/navigation";
import { load } from "@tauri-apps/plugin-store";

export default function App() {
  const router = useRouter();
  const getProfile = async () => {
    try {
      const db = await Database.load("sqlite:storyforge.db");
      let queryResult: Array<Profile> = await db.select(
        "SELECT * from profile",
      );
      if (queryResult.length !== 0) {
        const store = await load("settings.json", { autoSave: true });
        // Set a value.
        await store.set("profile", {
          profile_name: queryResult[0].profile_name,
          avatar: queryResult[0].avatar,
          id: queryResult[0].id,
        });

        router.replace(`/dashboard?profile=${queryResult[0].profile_name}`);
      } else {
        router.replace("/landing");
      }
    } catch (error) {
      router.replace("/landing");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Suspense fallback={null}>
      <></>
    </Suspense>
  );
}
