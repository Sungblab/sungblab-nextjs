import type { NextPage } from "next";
import Head from "next/head";
import { Layout, ProjectCard } from "../components/Components";
import { projects } from "../data/projects";

const Projects: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>프로젝트 - Sungblab</title>
        <meta
          name="description"
          content="Sungblab의 웹 개발 프로젝트 쇼케이스"
        />
      </Head>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">내 프로젝트</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              link={project.link}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Projects;
