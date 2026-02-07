import { useTheme } from "../features/ThemeContext";
import { useLanguage } from "../features/LanguageContext";
import { SocialButton } from "../ui/SocialButton";
import Link from "next/link";

export const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { translate } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`relative pt-20 pb-10 overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-600"
      }`}
    >
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
            <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-200'} animate-blob`}></div>
            <div className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl mix-blend-multiply filter pointer-events-none ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-200'} animate-blob animation-delay-2000`}></div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span
                className={`text-3xl font-bold tracking-tighter ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Sungblab<span className="text-purple-500">.</span>
              </span>
            </Link>
            <p className="max-w-md text-lg leading-relaxed mb-8">
              {translate("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4 gap-y-4">
              <SocialButton href="https://github.com/sungblab" icon="github" label="GitHub" />
              <SocialButton href="https://www.threads.com/@kimsungbin1119" icon="threads" label="Threads" />
              <SocialButton href="https://www.linkedin.com/in/sungblab" icon="linkedin" label="LinkedIn" />
              <SocialButton href="mailto:sungblab@gmail.com" icon="email" label="Email" />
            </div>
          </div>

          {/* Links Column */}
          <div className="flex lg:justify-end">
            <div className="min-w-[150px]">
              <h4
                className={`text-sm font-bold uppercase tracking-wider mb-6 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {translate("footer.navigation")}
              </h4>
              <ul className="space-y-4">
                {["Home", "Projects", "Blog", "About"].map((item) => (
                  <li key={item}>
                    <Link
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className={`transition-colors duration-200 hover:text-purple-500 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {translate(`nav.${item.toLowerCase()}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <p className="text-sm">
            {translate("footer.rights").replace("2024", currentYear.toString())}
          </p>
          <p className="text-sm flex items-center gap-2">
            {translate("footer.madeWith")}
          </p>
        </div>
      </div>
    </footer>
  );
};
