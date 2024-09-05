import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Layout } from "../components/Components";
import { projects, Project } from "../data/projects";

const ProjectCard: React.FC<Project> = ({
  title,
  description,
  link,
  image,
  technologies,
  date,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <Image
      src={image}
      alt={title}
      width={400}
      height={400}
      className="w-full h-72 object-cover"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 mb-4">{date}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 transition duration-300"
      >
        프로젝트 보기 →
      </a>
    </div>
  </div>
);

const Projects: NextPage = () => {
  const [filter, setFilter] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(filter.toLowerCase()) ||
      project.description.toLowerCase().includes(filter.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(filter.toLowerCase())
      )
  );

  return (
    <Layout>
      <Head>
        <title>Sungblab</title>
        <meta
          name="description"
          content="Sungblab의 웹 개발 프로젝트 쇼케이스"
        />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Projects</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="프로젝트 또는 기술 검색..."
            className="w-full p-2 border border-gray-300 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            검색 결과가 없습니다. 다른 키워드로 시도해 보세요.
          </p>
        )}
      </main>
    </Layout>
  );
};

export default Projects;
