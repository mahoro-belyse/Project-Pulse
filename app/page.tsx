"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Users,
  BarChart3,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard?login=true");
    }
  };

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-accent" />,
      title: "Track Progress",
      description: "Monitor project status and milestones in real-time",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Collaborate Easily",
      description:
        "Keep your small team aligned with simple project management",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-accent" />,
      title: "Manage Tasks",
      description: "Organize and prioritize work effortlessly",
    },
  ];

  if (!mounted) return null;

  return (
    <main className="min-h-screen">
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary opacity-60 -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-40 -z-10 animate-pulse" />
        <div
          className="absolute -bottom-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl opacity-40 -z-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full mb-6 text-sm font-semibold">
            <Sparkles size={16} />
            Team Project management system
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
            Project{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pulse
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Keep your team on track with powerful project management system
          </p>

          <button
            onClick={handleDashboardClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105 active:scale-95"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started"}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Project Pulse?
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Everything your team needs to succeed
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300 animate-fade-in group hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-foreground">
            Ready to boost your team's productivity?
          </h2>
          <button
            onClick={handleDashboardClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground hover:bg-primary-foreground/90 text-primary rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105 active:scale-95"
          >
            {isLoggedIn ? "Open Dashboard" : "Start Now"}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
