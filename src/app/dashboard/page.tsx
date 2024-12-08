"use client";

import { Avatar, Button } from "@nextui-org/react";

import ProjectCard from "@/components/dashboard/Card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Profile } from "@/utils/profile/query";
import Database from "@tauri-apps/plugin-sql";
import { load } from "@tauri-apps/plugin-store";

const projects = [
  {
    projectName: "Novel Project",
    caption: "Novel",
    lastUpdated: "2024-12-01",
    synopsis: "This is a synopsis of a Novel project.",
    imageUrl: "https://via.placeholder.com/270x150",
    projectType: "Novel" as "Novel" | "Children's Book",
  },
  {
    projectName: "Children's Book Project",
    caption: "Children's book",
    lastUpdated: "2024-12-03",
    synopsis: "This is a synopsis of a Children's book project.",
    imageUrl: "https://via.placeholder.com/270x150",
    projectType: "Children's Book" as "Novel" | "Children's Book",
  },
  {
    projectName: "Another Novel",
    caption: "Novel",
    lastUpdated: "2024-12-05",
    synopsis: "This is another synopsis of a Novel project.",
    imageUrl: "https://via.placeholder.com/270x150",
    projectType: "Novel" as "Novel" | "Children's Book",
  },
];

export default function Dashboard() {
  const searchParams = useSearchParams();
  const search = searchParams?.get("profile");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [profileName, setProfileName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  const getProfile = async () => {
    try {
      const db = await Database.load("sqlite:storyforge.db");
      let queryResult: Array<Profile> = await db.select(
        "SELECT * from profile where profile_name = $1",
        [search || ""]
      );
      if (queryResult.length !== 0) {
        setProfileName(queryResult[0].profile_name);
        setAvatar(queryResult[0].avatar || null);
        const store = await load("settings.json", { autoSave: true });
        // Set a value.
        await store.set("profile", { profile_name: queryResult[0].profile_name, avatar: queryResult[0].avatar, id: queryResult[0].id });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  useEffect(() => {
    getProfile();
  }, [profileName, avatar]);

  return (
    <Suspense fallback={null}>
      <>
        <div className="grid items-start justify-items-start justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-row gap-2 row-start-1 items-end justify-end justify-items-end sm:items-start mb-4">
            <h1 className="text-5xl">Welcome back, </h1>
            <Avatar
              showFallback
              fallback={"/avatar.png"}
              src={avatar || "/avatar.png"}
            />
            <h3 className="text-4xl">{profileName}</h3>
          </main>
          <div className="grid gap-16">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">Your Projects</h1>
              <Link href="../project/create">
                <Button color="primary" variant="bordered">
                  Create New Project
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>

            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold">Favourites</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example favorite card */}
              <ProjectCard
                projectName="Favorite Project"
                caption="Novel"
                lastUpdated="2024-12-05"
                synopsis="This is a short description of the featured project."
                imageUrl="https://via.placeholder.com/270x150"
                projectType="Novel"
              />
            </div>
          </div>
        </div>
      </>
    </Suspense>
  );
}
