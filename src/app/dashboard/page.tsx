import { Button } from "@nextui-org/react";

import ProjectCard from "@/components/dashboard/Card";
import Link from "next/link";

export default function Dashboard() {
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
  return (
    <>
      <div className="grid items-center justify-items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {/*<main className="flex flex-col gap-8 row-start-2 items-center justify-center justify-items-center sm:items-start">
        </main>*/}
        <div className="grid gap-16 p-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your Projects</h1>
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
            <h1 className="text-2xl font-bold">Favourites</h1>
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
  );
}
