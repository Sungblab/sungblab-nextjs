import { motion } from "framer-motion";
import { useTheme } from "../../components/features/ThemeContext";
import { useLanguage } from "../../components/features/LanguageContext";
import { AnimatedSection } from "../../components/ui/AnimatedSection";
import { SocialButton } from "../../components/ui/SocialButton";

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <AnimatedSection>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-5xl md:text-7xl font-bold mb-8 tracking-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {translate("contact.title")}
          </motion.h2>
          
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className={`text-xl md:text-2xl mb-12 font-light ${
               theme === "dark" ? "text-gray-400" : "text-gray-600"
             }`}
          >
            {translate("contact.description").split('\n').map((line: string, i: number) => (
              <span key={i}>
                {line}
                {i === 0 && <br className="hidden md:block" />}
              </span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <a 
              href="mailto:sungblab@gmail.com"
              className={`text-3xl md:text-5xl font-bold underline decoration-4 decoration-purple-500 underline-offset-8 transition-colors hover:text-purple-500 break-all max-w-full px-4 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}
            >
              sungblab@gmail.com
            </a>

            <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
              <SocialButton
                href="https://github.com/Sungblab"
                icon="github"
                label="GitHub"
                className="px-6 py-3 text-lg"
              />
              <SocialButton
                href="https://www.threads.com/@kimsungbin1119"
                icon="threads"
                label="Threads"
                className="px-6 py-3 text-lg"
              />
              <SocialButton
                href="https://www.linkedin.com/in/sungblab"
                icon="linkedin"
                label="LinkedIn"
                className="px-6 py-3 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>
    </section>
  );
};
