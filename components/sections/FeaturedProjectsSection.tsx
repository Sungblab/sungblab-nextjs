import Link from "next/link";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useTheme } from "../../components/features/ThemeContext";
import { useLanguage } from "../../components/features/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { Project } from "../../data/projects";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  projects,
}) => {
  const { theme } = useTheme();
  const { translate } = useLanguage();

  return (
    <section className="py-24 px-4 relative bg-transparent">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                  theme === "dark" ? "bg-blue-900/30 text-blue-300 border border-blue-700/50" : "bg-blue-100/50 text-blue-700 border border-blue-200"
                }`}
              >
                {translate("projects.selectedWork")}
              </motion.span>
              <h2 className={`text-4xl md:text-5xl font-bold tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {translate("projects.featuredProjects")}
              </h2>
            </div>
             <Link
              href="/projects"
              className={`hidden md:inline-flex items-center gap-2 text-lg font-medium transition-colors ${
                theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
              }`}
            >
              {translate("projects.viewAll")} <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="space-y-24">
            {projects.slice(0, 3).map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-16 items-center`}
              >
                  {/* Project Image Area */}
                  <Tilt className="w-full md:w-3/5 group" options={{ max: 15, scale: 1.02, speed: 400 }}>
                    <Link href={project.link} target="_blank" className="block relative rounded-3xl overflow-hidden shadow-2xl">
                      <div className={`aspect-video w-full bg-gray-200 relative overflow-hidden`}>
                         {/* Placeholder for actual image rendering to handle static/string types */}
                         {project.image && (
                           <div 
                             className="w-full h-full bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover:scale-105"
                             style={{ backgroundImage: `url(${typeof project.image === 'string' ? project.image : project.image.src})`, backgroundColor: theme === 'dark' ? '#0d1117' : '#f0f0f0' }}
                           />
                         )}
                         {/* Overlay */}
                         <div className={`absolute inset-0 transition-opacity duration-300 ${theme === 'dark' ? 'bg-black/30 group-hover:bg-black/10' : 'bg-black/10 group-hover:bg-transparent'}`} />
                      </div>
                    </Link>
                  </Tilt>

                  {/* Project Info Area */}
                  <div className="w-full md:w-2/5 flex flex-col items-start text-left">
                     <h3 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                       {project.title}
                     </h3>
                     <p className={`text-lg leading-relaxed mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                       {useLanguage().language === 'en' && project.description_en ? project.description_en : project.description}
                     </p>
                     
                     <div className="flex flex-wrap gap-2 mb-8">
                       {project.technologies.map((tech) => (
                         <span key={tech} className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                           theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                         }`}>
                           {tech}
                         </span>
                       ))}
                     </div>
                     
                     <Link
                       href={project.link}
                       target="_blank"
                       className={`inline-flex items-center gap-2 font-bold text-lg border-b-2 border-transparent pb-0.5 transition-all ${
                         theme === 'dark' 
                         ? 'text-white hover:border-blue-400 hover:text-blue-400' 
                         : 'text-gray-900 hover:border-blue-600 hover:text-blue-600'
                       }`}
                     >
                       {translate("projects.visitWebsite")} 
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                     </Link>
                  </div>
              </motion.div>
            ))}
          </div>

          
          <div className="mt-16 text-center md:hidden">
             <Link
              href="/projects"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors ${
                theme === "dark" 
                ? "bg-gray-800 text-white hover:bg-gray-700" 
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              {translate("projects.viewAll")}
            </Link>
          </div>

        </div>
      </AnimatedSection>
    </section>
  );
};
