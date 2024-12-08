import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { BookMarked, Baby } from "lucide-react"; // Import the required icons
import React from "react";
import { Character } from "@/utils/project/models";

export default function CharacterCard({
  name,
  personality,
  background,
  gender,
  age,
  role,
  image,
}: Character) {
  const getGender = (gender: "M" | "F" | "O" | undefined) => {
    if (gender === "M") {
      return "Male";
    } else if (gender === "F") {
      return "Female";
    }
    return "Other";
  };
  return (
    <Card className="flex flex-col w-80 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
        <h4 className="font-bold text-lg text-default-800">{name}</h4>
        <div className="flex items-center my-2 space-x-8">
          <p>
          {role}
          </p>
        </div>
        <p className="text-xs font-semibold text-default-500">Age: {age}</p>
        <small className="text-sm text-default-400 mt-1">
          Gender: {getGender(gender)}
        </small>
      </CardHeader>

      {/* Body Section */}
      <CardBody className="py-4 px-6">
        <Image
          alt="Project thumbnail"
          className="object-cover rounded-lg mx-auto"
          src={image || "/ai.svg"}
          width={270}
          height={150}
        />
        <h4 className="mt-4 text-md font-medium text-default-600 leading-5">Background</h4>
        <p className="mt-4 text-sm text-default-600 leading-5">{background}</p>
        <h4 className="mt-4 text-md font-medium text-default-600 leading-5">Personality</h4>
        <p className="mt-4 text-sm text-default-600 leading-5">
          {personality}
        </p>
      </CardBody>
    </Card>
  );
}
