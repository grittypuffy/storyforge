"use client";

import { Profile } from "@/utils/profile/query";
import { Character, ProjectDetails, ProjectExtras, ProjectModel } from "@/utils/project/models";
import {
  Button,
  Card,
  Badge,
  Accordion,
  AccordionItem,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { path } from "@tauri-apps/api";
import { readTextFile } from "@tauri-apps/plugin-fs";
import Database from "@tauri-apps/plugin-sql";
import { load } from "@tauri-apps/plugin-store";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

// Wrapper for Listbox component
const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
const items = [
  { key: "idea 1", label: "Idea A" },
  { key: "idea 2", label: "Idea B" },
  { key: "idea 3", label: "Idea C" },
  { key: "idea 4", label: "Idea D" },
];

export default function Project() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const today = new Date();
  const [profileId, setProfileId] = useState<string>("");
  const [profile, setProfile] = useState<string | null>("");
  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState<ProjectModel>({
    id: id || "",
    profile_id: profileId, 
    name: "",
    genre: undefined,
    category: "Novel",
    deadline: undefined,
    created_at: today.toISOString(),
    recently_updated: today.toISOString(),
    synopsis: undefined,
  });

  const [projectExtras, setProjectExtras] = useState<ProjectExtras>({
    outline: undefined,
    characters: undefined,
    images: undefined,
  });

  const getProfile = async () => {
    try {
      const db = await Database.load("sqlite:storyforge.db");
      const store = await load("settings.json", { autoSave: true });
      // Get profile value
      const profile = await store.get<Profile>("profile");
      if (profile) {
        setProfileId(profile.id);
        setProfile(profile.profile_name);
        let queryResult: Array<string> = await db.select(
          "SELECT id from profile where profile_name = $1",
          [profile.id]
        );
        if (queryResult.length !== 0) {
          console.log(queryResult);
          await db
            .select(
              "SELECT (id, profile_id, title, genre, category, deadline, created_at, recently_updated, synopsis) FROM project WHERE id = $1",
              [id]
            )
            .then(async (queryResult: any) => {
              if (queryResult as ProjectModel) {
                setProjectData(queryResult);
                let homeDir = await path.homeDir();
                let storyDir = await path.join(
                  homeDir,
                  "storyforge",
                  profile.profile_name || "default",
                  `${id}-${queryResult?.title}`
                );

                let outlineFile = await path.join(storyDir, "outline.md");
                setProjectExtras({...projectExtras, outline: await readTextFile(outlineFile)});
                let charactersFile = await path.join(storyDir, "characters.json");
                setProjectExtras({...projectExtras, characters: JSON.parse(await readTextFile(charactersFile))});
              }
            });
        }
      } else {
        router.replace("/landing");
      }
    } catch (error) {
      router.replace("/landing");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  useEffect(() => {
    getProfile();
  }, [projectData, projectExtras]);

  if (loading) {
    return <></>;
  }

  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#000000",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 style={{ margin: 0 }}>{projectData.name}</h1>
        <Link href="/project/create">
          <Button color="primary">Back to Project</Button>
        </Link>
      </header>

      {/* Metadata Section */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Badge variant="flat">Category: Children’s Book</Badge>
        <Badge variant="flat">Genre: Fiction</Badge>
        <Badge variant="flat">Deadline: Dec 15, 2023</Badge>
        <Badge variant="flat">Recently Updated</Badge>
      </section>

      {/* Description */}
      <section style={{ marginBottom: "40px" }}>
        <h3>Description</h3>
        <p>Some description about the project.</p>
      </section>

      {/* Chapters Section */}
      <section style={{ marginBottom: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h3 style={{ margin: 0 }}>Chapters</h3>
          <Link href="/project/story">
            <Button size="sm" color="secondary">
              Create New Chapter
            </Button>
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {[1, 2, 3, 4].map((chapter) => (
            <Card
              key={chapter}
              isHoverable
              isPressable
              style={{
                width: "180px",
                height: "180px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "18px" }}>Chapter {chapter}</h4>
              <h4
                style={{ marginTop: "10px", fontSize: "14px", color: "#888" }}
              >
                Text about the chapter...
              </h4>
            </Card>
          ))}
        </div>
      </section>

      {/* Outline Section */}
      <section style={{ marginBottom: "40px" }}>
        <Accordion>
          <AccordionItem key="outline" aria-label="Outline" title="Outline">
            <div style={{ padding: "10px" }}>
              <p>
                This section contains a detailed outline of the project. You can
                write long-form descriptions or plans here.
              </p>
            </div>
          </AccordionItem>
          <AccordionItem key="ideas" aria-label="Ideas" title="Ideas">
            <div style={{ padding: "10px" }}>
              <ListboxWrapper>
                <Listbox aria-label="Ideas List" items={items}>
                  {(item) => (
                    <ListboxItem
                      key={item.key}
                      className={item.key === "delete" ? "text-danger" : ""}
                      color={item.key === "delete" ? "danger" : "default"}
                    >
                      {item.label}
                    </ListboxItem>
                  )}
                </Listbox>
              </ListboxWrapper>
            </div>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Link to Dashboard */}
      <footer
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Link href="/dashboard">
          <Button color="primary" size="lg">
            Submit
          </Button>
        </Link>
      </footer>
    </div>
  );
}
