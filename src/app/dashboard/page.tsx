import { Button } from "@nextui-org/react";
import ProjectCard from "./Card";

export default function Dashboard() {
  const projects = [
    {
      projectName: "Novel Project",
      caption: "Novel", // Updated caption to match the type
      lastUpdated: "2024-12-01",
      synopsis: "This is a synopsis of a Novel project.",
      imageUrl: "https://via.placeholder.com/270x150",
      projectType: "Novel",
    },
    {
      projectName: "Children's Book Project",
      caption: "Children's book", // Updated caption to match the type
      lastUpdated: "2024-12-03",
      synopsis: "This is a synopsis of a Children's book project.",
      imageUrl: "https://via.placeholder.com/270x150",
      projectType: "Children's book",
    },
    {
      projectName: "Another Novel",
      caption: "Novel", // Updated caption to match the type
      lastUpdated: "2024-12-05",
      synopsis: "This is another synopsis of a Novel project.",
      imageUrl: "https://via.placeholder.com/270x150",
      projectType: "Novel",
    },
  ];
  

  return (
    <div className="grid gap-16 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Projects</h1>
        <Button color="primary" variant="bordered">
          Create New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-12">
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
  );
}
