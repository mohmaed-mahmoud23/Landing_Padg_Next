  "use client";

  import {
    Search,
    Shield,
    Star,
    Phone,
    Mail,
    MapPin,
    Play,
    ArrowRight,
    Zap,
    Award,
    Clock,
    CheckCircle,
    Sun,
    Moon,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Card, CardContent } from "@/components/ui/card";
  import { Badge } from "@/components/ui/badge";
  import Image from "next/image";
  import { useState, useEffect } from "react";

  export default function Home() {
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

    const carBrands = [
      { name: "ACURA", logo: "/placeholder.svg?height=80&width=80" },
      { name: "AION", logo: "/placeholder.svg?height=80&width=80" },
      { name: "AITO", logo: "/placeholder.svg?height=80&width=80" },
      { name: "ALFA ROMEO", logo: "/placeholder.svg?height=80&width=80" },
      { name: "ARCFOX", logo: "/placeholder.svg?height=80&width=80" },
      { name: "ASTON MARTIN", logo: "/placeholder.svg?height=80&width=80" },
      { name: "AUDI", logo: "/placeholder.svg?height=80&width=80" },
      { name: "AVATR", logo: "/placeholder.svg?height=80&width=80" },
      { name: "BENTLEY", logo: "/placeholder.svg?height=80&width=80" },
      { name: "BMW", logo: "/placeholder.svg?height=80&width=80" },
      { name: "MERCEDES", logo: "/placeholder.svg?height=80&width=80" },
      { name: "TOYOTA", logo: "/placeholder.svg?height=80&width=80" },
    ];

    const features = [
      {
        icon: Shield,
        title: "AI-Powered Protection",
        description:
          "Advanced nano-ceramic coatings with self-healing technology",
        color: "from-blue-500 to-cyan-500",
      },
      {
        icon: Zap,
        title: "Instant Application",
        description: "Revolutionary 60-minute installation process",
        color: "from-purple-500 to-pink-500",
      },
      {
        icon: Award,
        title: "Lifetime Guarantee",
        description: "Industry-leading warranty with 24/7 monitoring",
        color: "from-emerald-500 to-teal-500",
      },
      {
        icon: Clock,
        title: "Real-time Tracking",
        description: "Monitor your protection status via our mobile app",
        color: "from-orange-500 to-red-500",
      },
    ];

    const stats = [
      { number: "50K+", label: "Protected Vehicles", icon: Shield },
      { number: "99.9%", label: "Success Rate", icon: CheckCircle },
      { number: "24/7", label: "Support Available", icon: Clock },
      { number: "15+", label: "Years Experience", icon: Award },
    ];

    // Theme classes
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

    return (
      <div
        className={`min-h-screen overflow-hidden transition-all duration-700 ${themeClasses.background}`}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div
            className={`absolute inset-0 transition-all duration-700 ${themeClasses.backgroundOverlay}`}
          ></div>
          <div
            className={`absolute inset-0 ${
              isDarkMode
                ? "bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"
                : "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"
            }`}
          ></div>
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              isDarkMode ? "opacity-30" : "opacity-20"
            }`}
            style={{
              backgroundImage: `radial-gradient(circle at ${
                50 + scrollY * 0.01
              }% ${50 + scrollY * 0.005}%, ${
                isDarkMode
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(59, 130, 246, 0.15)"
              } 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            {/* Floating Badge */}
            <div
              className={`mb-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Badge
                className={`bg-gradient-to-r ${
                  isDarkMode
                    ? "from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-300"
                    : "from-blue-500/10 to-purple-500/10 border-blue-500/20 text-blue-600"
                } hover:${
                  isDarkMode
                    ? "from-blue-500/30 hover:to-purple-500/30"
                    : "from-blue-500/20 hover:to-purple-500/20"
                } px-6 py-2 rounded-full backdrop-blur-sm transition-all duration-300`}
              >
                🚀 Revolutionary AI Protection Technology
              </Badge>
            </div>

            {/* Main Heading with Gradient Animation */}
            <div
              className={`mb-8 transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
                <span
                  className={`bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent animate-pulse`}
                >
                  PROTECT
                </span>
                <br />
                <span
                  className={`bg-gradient-to-r ${themeClasses.gradientReverse} bg-clip-text text-transparent`}
                >
                  THE FUTURE
                </span>
              </h1>
              <div className="relative">
                <p
                  className={`text-xl md:text-2xl ${themeClasses.textSecondary} max-w-4xl mx-auto leading-relaxed`}
                >
                  Experience next-generation vehicle protection with our{" "}
                  <span
                    className={`text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.gradientReverse} font-semibold`}
                  >
                    AI-powered nano-ceramic technology
                  </span>{" "}
                  that adapts and evolves with your car.
                </p>
              </div>
            </div>

            {/* Futuristic Search Bar */}
            <div
              className={`max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div
                  className={`relative ${themeClasses.cardBg} rounded-2xl p-2 transition-all duration-700`}
                >
                  <div className="flex items-center">
                    <Search
                      className={`ml-4 h-6 w-6 ${themeClasses.textMuted}`}
                    />
                    <Input
                      placeholder="Enter your vehicle model for instant protection analysis..."
                      className={`flex-1 bg-transparent border-0 ${themeClasses.text} placeholder:${themeClasses.textMuted} text-lg px-4 py-4 focus:ring-0`}
                    />
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl px-8 py-3 shadow-lg text-white">
                      <Zap className="mr-2 h-5 w-5" />
                      Analyze
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-10 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 text-white"
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch Demo
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`text-lg px-10 py-6 rounded-2xl border-2 ${
                  isDarkMode
                    ? "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
                    : "border-slate-300 bg-white/50 hover:bg-white/80 hover:border-slate-400"
                } backdrop-blur-sm transition-all duration-300`}
              >
                Book Consultation
              </Button>
            </div>

            {/* Floating Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-800 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {stats.map((stat, index) => (
                <div key={index} className="group">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${
                        isDarkMode
                          ? "from-blue-500/20 to-purple-500/20"
                          : "from-blue-500/10 to-purple-500/10"
                      } rounded-2xl blur group-hover:blur-md transition-all duration-300`}
                    ></div>
                    <Card
                      className={`relative ${themeClasses.cardBg} ${themeClasses.cardHover} rounded-2xl transition-all duration-300`}
                    >
                      <CardContent className="p-6 text-center">
                        <stat.icon
                          className={`h-8 w-8 mx-auto mb-3 ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        />
                        <div
                          className={`text-3xl font-bold bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent`}
                        >
                          {stat.number}
                        </div>
                        <div className={`text-sm ${themeClasses.textMuted}`}>
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section - Bento Grid */}
        <section id="services" className="relative z-10 py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2
                className={`text-5xl font-bold mb-6 bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent`}
              >
                Revolutionary Features
              </h2>
              <p
                className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
              >
                Powered by artificial intelligence and quantum-grade materials
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className={`group relative overflow-hidden ${themeClasses.cardBg} ${themeClasses.cardHover} rounded-3xl transition-all duration-500 hover:scale-105`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-${
                      isDarkMode ? "20" : "10"
                    } transition-opacity duration-500`}
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${
                        feature.color.split(" ")[1]
                      }, ${feature.color.split(" ")[3]})`,
                    }}
                  ></div>
                  <CardContent className="relative p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-4 ${themeClasses.text} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${themeClasses.gradientReverse} transition-all duration-300`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`${themeClasses.textMuted} group-hover:${themeClasses.textSecondary} transition-colors duration-300`}
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Car Brands - Floating Grid */}
        <section id="brands" className="relative z-10 py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2
                className={`text-5xl font-bold mb-6 bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent`}
              >
                Universal Compatibility
              </h2>
              <p
                className={`text-xl ${themeClasses.textMuted} max-w-3xl mx-auto`}
              >
                Our AI technology adapts to any vehicle brand with precision
                engineering
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {carBrands.map((brand, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      isDarkMode
                        ? "from-blue-500/20 to-purple-500/20"
                        : "from-blue-500/10 to-purple-500/10"
                    } rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  ></div>
                  <Card
                    className={`relative ${themeClasses.cardBg} ${themeClasses.cardHover} rounded-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mb-6 flex justify-center">
                        <div className="relative">
                          <div
                            className={`absolute inset-0 ${
                              isDarkMode ? "bg-white/10" : "bg-slate-200/50"
                            } rounded-2xl blur group-hover:blur-md transition-all duration-300`}
                          ></div>
                          <div
                            className={`relative ${
                              isDarkMode
                                ? "bg-white/5 group-hover:bg-white/10"
                                : "bg-white/30 group-hover:bg-white/60"
                            } p-4 rounded-2xl transition-all duration-300`}
                          >
                            <Image
                              src={brand.logo || "/placeholder.svg"}
                              alt={`${brand.name} logo`}
                              width={60}
                              height={60}
                              className={`group-hover:scale-110 transition-transform duration-300 ${
                                isDarkMode
                                  ? "filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                                  : "filter group-hover:brightness-110"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <h3
                        className={`font-bold ${themeClasses.text} group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${themeClasses.gradientReverse} transition-all duration-300 text-sm`}
                      >
                        {brand.name}
                      </h3>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Holographic Effect */}
        <section className="relative z-10 py-20 px-6">
          <div className="container mx-auto">
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  isDarkMode
                    ? "from-blue-500/20 via-purple-500/20 to-pink-500/20"
                    : "from-blue-500/10 via-purple-500/10 to-pink-500/10"
                } rounded-3xl blur-xl`}
              ></div>
              <div
                className={`relative ${themeClasses.cardBg} rounded-3xl p-16 text-center transition-all duration-700`}
              >
                <div className="max-w-4xl mx-auto">
                  <h2
                    className={`text-5xl font-bold mb-6 bg-gradient-to-r ${
                      isDarkMode
                        ? "from-white via-blue-200 to-purple-200"
                        : "from-slate-900 via-blue-700 to-purple-700"
                    } bg-clip-text text-transparent`}
                  >
                    Ready for the Future?
                  </h2>
                  <p
                    className={`text-xl ${themeClasses.textSecondary} mb-10 leading-relaxed`}
                  >
                    Join thousands of forward-thinking car owners who've already
                    upgraded to AI-powered protection. Experience the difference
                    that next-generation technology makes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-12 py-6 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 text-white"
                    >
                      <Zap className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                      Start Protection Now
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className={`text-lg px-12 py-6 rounded-2xl border-2 ${
                        isDarkMode
                          ? "border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30"
                          : "border-slate-300 bg-white/50 hover:bg-white/80 hover:border-slate-400"
                      } backdrop-blur-sm transition-all duration-300`}
                    >
                      <Phone className="mr-3 h-6 w-6" />
                      Call: (555) 123-4567
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`relative z-10 py-16 px-6 border-t ${
            isDarkMode ? "border-white/10" : "border-slate-200"
          } transition-all duration-700`}
        >
          <div className="container mx-auto">
            <div className="grid md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-75"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <span
                      className={`text-xl font-bold bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent`}
                    >
                      AutoShield AI
                    </span>
                    <p className={`text-xs ${themeClasses.textMuted}`}>
                      Next-Gen Protection
                    </p>
                  </div>
                </div>
                <p className={`${themeClasses.textMuted} mb-6 leading-relaxed`}>
                  Pioneering the future of vehicle protection with artificial
                  intelligence and quantum-grade materials.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className={themeClasses.textSecondary}>
                      4.9/5 Rating
                    </span>
                  </div>
                </div>
              </div>

              {[
                {
                  title: "Services",
                  items: [
                    "AI Protection",
                    "Nano Coating",
                    "Smart Monitoring",
                    "Quantum Shield",
                  ],
                },
                {
                  title: "Technology",
                  items: [
                    "AI Analysis",
                    "Self-Healing",
                    "Real-time Tracking",
                    "Mobile App",
                  ],
                },
                {
                  title: "Contact",
                  items: [
                    { icon: Phone, text: "(555) 123-4567" },
                    { icon: Mail, text: "hello@autoshieldai.com" },
                    { icon: MapPin, text: "Silicon Valley, CA" },
                  ],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h3 className={`font-bold mb-6 ${themeClasses.text}`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {typeof item === "string" ? (
                          <a
                            href="#"
                            className={`${themeClasses.textMuted} hover:${themeClasses.text} transition-colors duration-300 hover:translate-x-1 inline-block`}
                          >
                            {item}
                          </a>
                        ) : (
                          <div
                            className={`flex items-center space-x-3 ${themeClasses.textMuted}`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.text}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              className={`border-t ${
                isDarkMode ? "border-white/10" : "border-slate-200"
              } mt-12 pt-8 text-center transition-all duration-700`}
            >
              <p className={themeClasses.textMuted}>
                &copy; 2024 AutoShield AI. All rights reserved. | Powered by
                Quantum Technology
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
