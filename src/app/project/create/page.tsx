"use client";

import { Baby, BookMarked } from "lucide-react";
import {
  Button,
  Input,
  Textarea,
  Image,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  useDisclosure,
  Form,
} from "@nextui-org/react";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mkdir, BaseDirectory, create, writeTextFile } from '@tauri-apps/plugin-fs';
import { load } from "@tauri-apps/plugin-store";
import Database from "@tauri-apps/plugin-sql";
import * as path from '@tauri-apps/api/path';

import { v4 as uuidv4 } from "uuid";

import Sparkle from "@/../public/ai.svg";
import CharacterCard from "@/components/character/Card";
import { Profile } from "@/utils/profile/query";
import inputStyles from "@/utils/input/styles";
import genres from "@/utils/project/genres";
import {
  Character,
  ProjectDetails,
  ProjectExtras,
} from "@/utils/project/models";

export default function CreateProject() {
  const router = useRouter();
  const today = new Date();
  const [profile, setProfile] = useState<string | null>("");
  const [projectData, setProjectData] = useState<ProjectDetails>({
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

  // Character details
  const [characterData, setCharacterData] = useState<Character>({
    name: undefined,
    personality: undefined,
    background: undefined,
    gender: undefined,
    age: undefined,
    role: undefined,
    image: undefined,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [loading, setLoading] = useState(true);

  const createNewProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const db = await Database.load("sqlite:storyforge.db");
    if (profile !== "") {
      let queryResult: Array<string> = await db.select(
        "SELECT profile_id from profile where profile_name = $1",
        [profile]
      );
      if (queryResult.length !== 0) {
        let uuid = uuidv4();
        await db
          .execute(
            "INSERT INTO project (id, profile_id, title, genre, category, deadline, created_at, recently_updated, synopsis) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [uuid, queryResult[0], projectData.name, projectData.genre, projectData.category, projectData.deadline, projectData.created_at, projectData.recently_updated, projectData.synopsis]
          )
          .then(async (queryResult) => {
            if (queryResult) {
              let homeDir = await path.homeDir();
              let storyDir = await path.join(homeDir, 'storyforge', profile || 'default', `${uuid}-${projectData.name}`);
              await mkdir(storyDir);
              let outlineFile = await path.join(storyDir, 'outline.md')
              await create(outlineFile);
              await writeTextFile(outlineFile, projectExtras.outline || "");
              let charactersFile = await path.join(storyDir, 'characters.json')
              await create(charactersFile);
              await writeTextFile(outlineFile, JSON.stringify(projectExtras.characters) || "{}");
              setProjectData({
                name: "",
                genre: undefined,
                category: "Novel",
                deadline: undefined,
                created_at: today.toISOString(),
                recently_updated: today.toISOString(),
                synopsis: undefined,
              });
              setProjectExtras({
                outline: undefined,
                characters: undefined,
                images: undefined,
              });
              router.push(`/project?id=${uuid}`);
            }
          });
      }
    } else {
      console.log("No profile name");
    }
  };

  // Handle file selection and preview the avatar
  const handleCharacterImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCharacterData({
          ...characterData,
          image: reader.result as string,
        }); // Set the selected image as the new source
      };
      reader.readAsDataURL(file);
    }
  };

  const createCharacter = () => {
    let characters = projectExtras.characters || [];
    characters.push(characterData);
    console.log(characters);
    setProjectExtras({ ...projectExtras, characters: characters });
    setCharacterData({
      name: undefined,
      personality: undefined,
      background: undefined,
      gender: undefined,
      age: undefined,
      role: undefined,
      image: undefined,
    });
  };

  const getProfile = async () => {
    try {
      const store = await load("settings.json", { autoSave: true });
      // Get profile value
      const profile = await store.get<Profile>("profile");
      if (profile) {
        setProfile(profile?.profile_name);
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
  }, []);

  if (loading) {
    return <></>;
  }
  return (
    <Suspense fallback={null}>
      <>
        <div className="flex items-start justify-center w-full min-h-screen p-24 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-1 w-full">
            {/* Back to Dashboard button */}
            <Button
              color="secondary"
              variant="flat"
              className="mb-4 self-start"
              onPress={() => router.push(`/dashboard?profile=${profile}`)}
            >
              Back to Dashboard
            </Button>
            <div className="flex flex-row gap-8 w-full">
              <h3 className="text-4xl font-medium">Create a new project</h3>
              <Button
                color="primary"
                variant="flat"
                className="mb-4 self-start"
                onPress={() => null}
              >
                <Sparkle />
                Get ideas
              </Button>
            </div>
            <Form
              className="flex flex-col space-y-6 w-full"
              onSubmit={(event) => {}}
            >
              {/* Project Name */}
              <h4 className="text-2xl font-medium">Project Name</h4>
              <Input
                type="text"
                placeholder="Enter your project name"
                classNames={inputStyles}
                name="name"
                className="w-3/12"
                isRequired
                onChange={(event) =>
                  setProjectData({ ...projectData, name: event.target.value })
                }
              />

              {/* Project Type */}
              <h4 className="text-2xl font-medium">Project Category</h4>
              <Select
                className="w-3/12"
                defaultSelectedKeys={["novel"]}
                placeholder="Select category"
                isRequired
                name="category"
                onChange={(event) =>
                  setProjectData({
                    ...projectData,
                    category: event.target.value as "Children's Book" | "Novel",
                  })
                }
              >
                <SelectItem
                  key="novel"
                  startContent={<BookMarked />}
                  value={"Novel"}
                >
                  Novel
                </SelectItem>
                <SelectItem
                  key="childrens"
                  startContent={<Baby />}
                  value={"Children's Book"}
                >
                  Children's Book
                </SelectItem>
              </Select>

              {/* Project Genre */}
              <h4 className="text-2xl font-medium">Project Genre</h4>
              <Select
                className="w-3/12"
                placeholder="Select project genre"
                isRequired
                onChange={(event) =>
                  setProjectData({ ...projectData, genre: event.target.value })
                }
              >
                {genres.map((genre: any) => (
                  <SelectItem key={genre.key}>{genre.label}</SelectItem>
                ))}
              </Select>

              {/* Deadline for the project */}
              <h4 className="text-2xl font-medium">Deadline</h4>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <DatePicker
                  isRequired
                  className="w-3/12"
                  disableAnimation
                  onChange={(event) =>
                    setProjectData({
                      ...projectData,
                      deadline: event.toString(),
                    })
                  }
                />
              </div>

              {/* Synopsis */}
              <h4 className="text-2xl font-medium">Synopsis</h4>
              <Textarea
                onChange={(event) =>
                  setProjectData({
                    ...projectData,
                    synopsis: event.target.value,
                  })
                }
                className="w-6/12"
                minRows={8}
                placeholder="Type your synopsis"
              />

              {/* Outline */}
              <h4 className="text-2xl font-medium">Outline</h4>
              <Textarea
                onChange={(event) =>
                  setProjectExtras({
                    ...projectExtras,
                    outline: event.target.value,
                  })
                }
                className="w-6/12"
                minRows={8}
                placeholder="Type your outline"
              />

              {/* Characters */}
              <div className="flex flex-row items-center justify-between w-6/12">
                <h4 className="text-2xl font-medium">Characters</h4>
                <Button onPress={onOpen} color="primary">
                  Add a character
                </Button>
              </div>
              <div className="w-6/12 min-h-44 grid grid-flow-col justify-around overflow-x-scroll space-x-8 p-8 bg-default-100 rounded-lg">
                {projectExtras.characters &&
                  projectExtras.characters.map((character, key) => (
                    <CharacterCard
                      name={character.name}
                      gender={character.gender}
                      age={character.age}
                      role={character.role}
                      background={character.background}
                      personality={character.personality}
                      image={character.image}
                      key={key}
                    ></CharacterCard>
                  ))}
                <div className="">
                  {!projectExtras.characters && "No characters"}
                  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="3xl"
                    backdrop="blur"
                    scrollBehavior="inside"
                    className="scrollbar-default"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Enter character details
                          </ModalHeader>
                          <ModalBody>
                            <Form>
                              <Input
                                label="Name"
                                placeholder="Enter character name"
                                isRequired
                                name="character-name"
                                value={characterData.name}
                                onChange={(event) =>
                                  setCharacterData({
                                    ...characterData,
                                    name: event.target.value,
                                  })
                                }
                                fullWidth
                              />
                              <RadioGroup
                                name="character-gender"
                                label="Gender"
                                value={characterData.gender}
                                onChange={(event) =>
                                  setCharacterData({
                                    ...characterData,
                                    gender: event.target.value as
                                      | "M"
                                      | "F"
                                      | "O",
                                  })
                                }
                                orientation="horizontal"
                                className="mt-2"
                              >
                                <Radio value="M">Male</Radio>
                                <Radio value="F">Female</Radio>
                                <Radio value="O">Other</Radio>
                              </RadioGroup>
                              <Input
                                label="Age"
                                placeholder="Enter character age"
                                name="character-age"
                                value={characterData.age?.toString()}
                                onChange={(event) =>
                                  setCharacterData({
                                    ...characterData,
                                    age: Number.parseInt(event.target.value),
                                  })
                                }
                                fullWidth
                              />
                              <Input
                                label="Type"
                                placeholder="Enter character type (Protagonist, antagonist, etc.)"
                                name="character-type"
                                value={characterData.role}
                                onChange={(event) =>
                                  setCharacterData({
                                    ...characterData,
                                    role: event.target.value,
                                  })
                                }
                                fullWidth
                              />
                              <Textarea
                                value={characterData.background}
                                onChange={(event) =>
                                  setCharacterData({
                                    ...characterData,
                                    background: event.target.value,
                                  })
                                }
                                className="w-full"
                                label="Background"
                                minRows={8}
                                placeholder="Enter background of character"
                              />
                              <Textarea
                                value={characterData.personality}
                                onChange={(event) =>
                                  setCharacterData({
                                    ...characterData,
                                    personality: event.target.value,
                                  })
                                }
                                className="w-full"
                                label="Personality"
                                minRows={8}
                                placeholder="Enter personality of character"
                              />

                              <h4 className="text-lg">Image</h4>
                              <label
                                htmlFor="character-image"
                                className="flex flex-row gap-8 row-start-2 items-center justify-center justify-items-center bg-default-50"
                              >
                                {characterData.image ? (
                                  <Image
                                    id="character-image"
                                    src={characterData.image}
                                    alt="Avatar"
                                    className="w-56 h-40 object-cover transition-all"
                                  />
                                ) : (
                                  <></>
                                )}
                                <input
                                  type="file"
                                  className="text-sm text-gray-500/0 cursor-pointer
                                    file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold file:bg-blue-600
                                  file:text-white hover:file:bg-blue-700 file:disabled:opacity-50
                                    file:disabled:pointer-events-none
                                    dark:text-neutral-500/0
                                    dark:file:bg-blue-500
                                    dark:hover:file:bg-blue-400"
                                  accept="image/*"
                                  onChange={handleCharacterImageFileChange}
                                />
                              </label>
                            </Form>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button
                              color="primary"
                              onPress={() => {
                                createCharacter();
                                return onClose();
                              }}
                            >
                              Create
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              </div>

              {/* Submit Button */}
              <Button color="primary" className="mt-8 w-6/12" type="submit">
                Create
              </Button>
            </Form>
          </main>
        </div>
      </>
    </Suspense>
  );
}
