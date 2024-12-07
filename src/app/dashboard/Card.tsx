import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { BookMarked, Baby } from "lucide-react"; // Import the required icons

interface CardProps {
  projectName: string;
  caption: "Novel" | "Children's book"; // Update the caption prop type
  lastUpdated: string;
  synopsis: string;
  imageUrl: string;
  projectType: "Novel" | "Children's book"; // Add projectType prop
}

const typeIcons = {
  Novel: <BookMarked size={20} className="mr-2 text-primary" />,
  "Children's book": <Baby size={20} className="mr-2 text-primary" />,
};

export default function ProjectCard({
  projectName,
  caption,
  lastUpdated,
  synopsis,
  imageUrl,
  projectType,
}: CardProps) {
  return (
    <Card className="w-80 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header Section */}
      <CardHeader className="pb-0 pt-4 px-6 flex-col items-start">
        <h4 className="font-bold text-lg text-default-800">{projectName}</h4>
        <div className="flex items-center mt-2">
          {typeIcons[caption]} {/* Render icon based on caption */}
          <p className="text-xs uppercase font-semibold text-default-500">
            {caption}
          </p>
        </div>
        <small className="text-sm text-default-400 mt-1">
          Last updated: {lastUpdated}
        </small>
      </CardHeader>

      {/* Body Section */}
      <CardBody className="py-4 px-6">
        <Image
          alt="Project thumbnail"
          className="object-cover rounded-lg mx-auto"
          src={imageUrl}
          width={270}
          height={150}
        />
        <p className="mt-4 text-sm text-default-600 leading-5">{synopsis}</p>
      </CardBody>

      {/* Footer Section */}
      <div className="px-6 pb-4">
        <Button
          color="primary"
          variant="bordered"
          className="w-full text-sm font-semibold"
        >
          View Project
        </Button>
      </div>
    </Card>
  );
}
