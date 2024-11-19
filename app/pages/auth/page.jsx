"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Github } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { User } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const toggleView = () => setIsLogin((prev) => !prev);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("email");
      const storedUsername = localStorage.getItem("username");
      if (storedEmail) setEmail(storedEmail);
      if (storedUsername) setUsername(storedUsername);
    }
  }, []);
  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-orange-500 text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="w-24 h-24 bg-orange-500">
                <AvatarFallback className="text-black text-[50px]">
                  {session.user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4 text">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-orange-100">
                  Name
                </Label>
                <div className="flex items-center space-x-2 text-orange-100">
                  <User size={18} />
                  <span>{session.user.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-orange-100">
                  Email
                </Label>
                <div className="flex items-center space-x-2 text-orange-100">
                  <Mail size={18} />
                  <span>{session.user.email}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => signOut()}
              className="w-full bg-black hover:bg-white hover:text-black text-white"
            >
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the data object
    const data = {
      email,
      password,
      action: isLogin ? "login" : "signup",
    };

    // Include username if signing up
    if (!isLogin) {
      data.username = username;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        // Optionally, redirect the user or perform other actions
        // For example, you might save a token or user info to context or local storage
      } else {
        setMessage(result.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while processing your request.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <motion.div
        className="m-auto bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl h-[34rem] overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            className="w-full md:w-1/2 p-8"
            initial={{ x: isLogin ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLogin ? 100 : -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <ShoppingBag size={48} className="text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-4 text-orange-600">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>

            {/* Display response messages */}
            {message && (
              <div className="mb-4 text-center text-red-500">{message}</div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Username field for signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border-orange-200 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              )}
              {/* Email field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-orange-200 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              {/* Password field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-orange-200 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </Button>
            </form>

            {/* Social Media Buttons */}
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600 mb-2">
                Or continue with
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-orange-200 hover:bg-orange-100"
                  onClick={() => signIn("github")}
                >
                  <Github className="text-blue-600" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side Panel */}
        <motion.div
          className="w-full md:w-1/2 bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 flex flex-col justify-center items-center"
          initial={{ x: isLogin ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            {isLogin ? "New Here?" : "One of Us?"}
          </h2>
          <p className="text-center mb-8">
            {isLogin
              ? "Sign up and discover a great amount of new opportunities!"
              : "If you already have an account, just log in. We've missed you!"}
          </p>
          <Button
            variant="outline"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 transition-colors duration-300"
            onClick={toggleView}
          >
            {isLogin ? "Sign Up" : "Log In"}
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
