"use client";
import "./globals.css";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { search as searchApi } from "../lib/api";
import { useRouter } from "next/navigation";
import { Moon, Shield, Sun } from "lucide-react";
import { Button } from "../components/ui/button";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const themeClasses = {
    background: isDarkMode
      ? "bg-black text-white"
      : "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-slate-900",
    backgroundOverlay: isDarkMode
      ? "bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
      : "bg-gradient-to-br from-white/80 via-blue-100/50 to-purple-100/50",
    cardBg: isDarkMode
      ? "bg-white/5 backdrop-blur-2xl border-white/10"
      : "bg-white/70 backdrop-blur-2xl border-white/40 shadow-xl",
    cardHover: isDarkMode
      ? "hover:bg-white/10"
      : "hover:bg-white/90 hover:shadow-2xl",
    text: isDarkMode ? "text-white" : "text-slate-900",
    textSecondary: isDarkMode ? "text-gray-300" : "text-slate-700",
    textMuted: isDarkMode ? "text-gray-400" : "text-slate-500",
    navBg: isDarkMode
      ? "bg-white/10 backdrop-blur-2xl border-white/20"
      : "bg-white/80 backdrop-blur-2xl border-white/60 shadow-lg",
    gradient: isDarkMode
      ? "from-white to-gray-300"
      : "from-slate-900 to-slate-700",
    gradientReverse: isDarkMode
      ? "from-blue-400 via-purple-400 to-pink-400"
      : "from-blue-600 via-purple-600 to-pink-600",
  };

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!value) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await searchApi(value);
        const flatRes =
          Array.isArray(res) && Array.isArray(res[0]) ? res[0] : res;
        setResults(flatRes);
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
  };

  return (
    <html lang="en">
      <body>
        <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-6  ">
          <nav
            className={`${themeClasses.navBg} rounded-2xl px-6 py-4 shadow-2xl transition-all duration-700`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h1
                    className={`text-xl font-bold bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent`}
                  >
                    <Link href="/"> AutoShield AI</Link>
                  </h1>
                  <p className={`text-xs ${themeClasses.textMuted}`}>
                    Next-Gen Protection
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex space-x-6">
                  {[
                    { name: "About", href: "/about" },
                 
                  ].map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`${themeClasses.textSecondary} hover:${themeClasses.text} transition-all duration-300 relative group`}
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  ))}
                </nav>

                {/* Theme Toggle */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleTheme}
                    className={`relative w-14 h-7 ${
                      isDarkMode ? "bg-slate-700" : "bg-slate-300"
                    } rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isDarkMode
                        ? "focus:ring-offset-black"
                        : "focus:ring-offset-white"
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

                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 rounded-xl px-6 shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                  Get Started
                </Button>
              </div>
            </div>
          </nav>
        </header>

        {/* ✅ Main Content */}
        {children}
      </body>
    </html>
  );
}

function getResultLink(item: any): string {
  return `/parts/${item.id || item._id}`;
}
