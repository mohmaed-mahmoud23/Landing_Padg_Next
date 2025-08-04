"use client";

import "./globals.css";
import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  createContext,
  useContext,
} from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { search } from "../lib/api"; // ✅ API function
import { useRouter } from "next/navigation";

const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
}>({ isDarkMode: true, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

// ✅ Dynamic Link Generator
export const getResultLink = (item: any) => {
  if (!item || !item.type) return "/";
  switch (item.type.toLowerCase()) {
    case "type":
      return `/types/${item.id || item._id}`;
    case "model":
      return `/models/${item.id || item._id}`;
    case "submodel":
      return `/submodels/${item.id || item._id}`;
    case "modelyear":
      return `/model-years/${item.id || item._id}`;
    case "version":
      return `/versions/${item.id || item._id}`;
    case "part":
      return `/parts/${item.id || item._id}`;
    default:
      return "/";
  }
};

// ✅ SearchBar Component
const SearchBar = memo(() => {
  const { isDarkMode } = useTheme();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let timeoutId: NodeJS.Timeout;

  const handleSearch = useCallback(async (value: string) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
  
    try {
      const data = await search(value);
      console.log("Search API Result:", data); // ✅ للتأكد من الداتا
      setResults(data || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 500); // ✅ Debounce
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search cars..."
        className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
          isDarkMode
            ? "bg-slate-800 text-white placeholder-gray-400"
            : "bg-white text-black placeholder-gray-500"
        }`}
        value={query}
        onChange={onChange}
      />
      {loading && (
        <div className="absolute right-3 top-2 text-xs text-gray-400">
          Loading...
        </div>
      )}
      {results.length > 0 && (
        <ul
          className={`absolute z-50 w-full mt-2 rounded-lg shadow-lg max-h-64 overflow-auto ${
            isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"
          }`}
        >
          {results.map((item: any) => (
            <li
              key={item.id || item._id}
              className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer text-sm flex justify-between"
              onClick={() => {
                router.push(getResultLink(item));
                setQuery("");
                setResults([]);
              }}
            >
              <span>{item.name || item.title || "Unnamed"}</span>
              <span className="text-xs text-gray-400">
                ({item.type || "Item"})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
SearchBar.displayName = "SearchBar";

const Header = memo(() => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-6">
      <nav
        className={`rounded-2xl px-6 py-4 shadow-2xl transition-all duration-700 ${
          isDarkMode
            ? "bg-white/10 backdrop-blur-2xl border-white/20"
            : "bg-white/80 backdrop-blur-2xl border-white/60 shadow-lg"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="block">
              <Image
                src="/images/nav.webp"
                alt="Logo"
                width={150}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Navigation + Search + Toggle */}
          <div className="flex flex-row items-center justify-center space-x-4 md:space-x-8">
            {/* ✅ SearchBar */}
            <div className="hidden md:block w-64">
              <SearchBar />
            </div>

            <nav className="flex space-x-4 md:space-x-6">
              <Link
                href="/about"
                className={`relative group transition-all duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-slate-700"
                } hover:${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </nav>

            {/* Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDarkMode
                  ? "bg-slate-700 focus:ring-offset-black"
                  : "bg-slate-300 focus:ring-offset-white"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
                  isDarkMode ? "translate-x-0" : "translate-x-7"
                }`}
              >
                {isDarkMode ? (
                  <Moon className="h-3 w-3 text-slate-700" />
                ) : (
                  <Sun className="h-3 w-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
});
Header.displayName = "Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const prefersDark =
        storedTheme === "dark" ||
        (!storedTheme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  }, []);

  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body
        className="transition-colors duration-300"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <Header />
            {children}
          </ThemeContext.Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
