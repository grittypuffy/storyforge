"use client";

import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { Baby, BookMarked } from "lucide-react";
import { useState } from "react";

import inputStyles from "@/utils/input/styles";
import {
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
} from "@nextui-org/react";
import genres from "@/utils/project/genres";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Landing() {
  const router = useRouter();

  const [projectName, setProjectName] = useState("");
  const [genre, setGenre] = useState("");
  const [type, setType] = useState("");
  const [deadLine, setDeadLine] = useState<string | null>(null);
  const [synopsis, setSynopsis] = useState<string | null>(null);
  const [outline, setOutline] = useState<string | null>(null);
  const [characters, setCharacters] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Character details
  const [characterName, setCharacterName] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [characterGender, setCharacterGender] = useState("");
  const [characterAge, setCharacterAge] = useState("");
  const [characterType, setCharacterType] = useState("");

  return (
    <>
      <div className="flex items-start justify-center w-full min-h-screen p-24 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-1 w-full">
          {/* Back to Dashboard button */}
          <Button
            color="secondary"
            variant="flat"
            className="mb-4 self-start"
            onPress={() => router.push("/dashboard")}
          >
            Back to Dashboard
          </Button>

          <h3 className="text-4xl font-medium">Create a new project</h3>
          <form className="flex flex-col space-y-6 w-full">
            {/* Project Name */}
            <h4 className="text-2xl font-medium">Project Name</h4>
            <Input
              type="text"
              placeholder="Enter your project name"
              classNames={inputStyles}
              className="w-3/12"
              isRequired
              onChange={(event) => setProjectName(event.target.value)}
            />

            {/* Project Type */}
            <h4 className="text-2xl font-medium">Project Type</h4>
            <Select
              className="w-3/12"
              defaultSelectedKeys={["novel"]}
              placeholder="Select project type"
              isRequired
              onChange={(event) => setType(event.target.value)}
            >
              <SelectItem key="novel" startContent={<BookMarked />}>
                Novel
              </SelectItem>
              <SelectItem key="childrens" startContent={<Baby />}>
                Children's Book
              </SelectItem>
            </Select>

            {/* Project Genre */}
            <h4 className="text-2xl font-medium">Project Genre</h4>
            <Select
              className="w-3/12"
              placeholder="Select project genre"
              isRequired
              onChange={(event) => setGenre(event.target.value)}
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
                onChange={(event) => setDeadLine(event.toString())}
              />
            </div>

            {/* Synopsis */}
            <h4 className="text-2xl font-medium">Synopsis</h4>
            <Textarea
              onChange={(event) => setSynopsis(event.target.value)}
              className="w-6/12"
              minRows={8}
              placeholder="Type your synopsis"
            />

            {/* Outline */}
            <h4 className="text-2xl font-medium">Outline</h4>
            <Textarea
              onChange={(event) => setOutline(event.target.value)}
              className="w-6/12"
              minRows={8}
              placeholder="Type your outline"
            />

            {/* Characters */}
            <div className="flex flex-row items-center justify-between w-6/12">
              <h4 className="text-2xl font-medium">Characters</h4>
              <Button onPress={onOpen} color="primary">
                Create one
              </Button>
            </div>
            <div className="w-6/12 min-h-44 flex flex-col items-center justify-center justify-items-center bg-default-100 rounded-lg">
              {characters ? (
                <>hell</>
              ) : (
                <div className="">
                  No characters
                  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="3xl"
                    backdrop="blur"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Enter character details
                          </ModalHeader>
                          <ModalBody>
                            <Input
                              label="Name"
                              placeholder="Enter character name"
                              isRequired
                              name="character-name"
                              value={characterName}
                              onChange={(event) =>
                                setCharacterName(event.target.value)
                              }
                              fullWidth
                            />
                            <RadioGroup
                              name="character-gender"
                              label="Gender"
                              value={characterGender}
                              onChange={(event) =>
                                setCharacterGender(event.target.value)
                              }
                              orientation="horizontal"
                              className="mt-2"
                            >
                              <Radio value="Male">Male</Radio>
                              <Radio value="Female">Female</Radio>
                              <Radio value="Other">Other</Radio>
                            </RadioGroup>
                            <Input
                              label="Age"
                              placeholder="Enter character age"
                              name="character-age"
                              value={characterAge}
                              onChange={(event) =>
                                setCharacterAge(event.target.value)
                              }
                              fullWidth
                            />
                            <Input
                              label="Type"
                              placeholder="Enter character type (Protagonist, antagonist, etc.)"
                              name="character-type"
                              value={characterType}
                              onChange={(event) =>
                                setCharacterType(event.target.value)
                              }
                              fullWidth
                            />
                            <Textarea
                              value={characterDescription}
                              onChange={(event) =>
                                setCharacterDescription(event.target.value)
                              }
                              className="w-full"
                              label="Description"
                              minRows={8}
                              placeholder="Type your description"
                            />
                            <h4 className="text-lg">Image</h4>
                            <Image
                              alt="NextUI hero Image"
                              src="https://nextui.org/images/hero-card-complete.jpeg"
                              width={300}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                              Create
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Link href="../project">
            <Button
              color="primary"
              className="mt-8 w-6/12">
              Submit
            </Button>
            </Link>
          </form>
        </main>
      </div>
    </>
  );
}
