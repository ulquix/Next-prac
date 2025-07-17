'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { Github, Chrome, LogOut, User, Mail, Loader2, ChefHat } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const callbackurl = useSearchParams().get("redirected") || "";
  const [isSigningIn, setIsSigningIn] = useState(null); // Track which provider is being used
  const [isSigningOut, setIsSigningOut] = useState(false);

  const { data: session, status } = useSession();

  const handleSignIn = async (provider) => {
    setIsSigningIn(provider);
    try {
      await signIn(provider, { callbackUrl: `/${callbackurl}` });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSigningIn(null);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ callbackUrl: `/${callbackurl}` });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
        <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-slate-400 text-sm">You&apos;re successfully signed in</p>
          </div>

          {/* User Info */}
          <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="relative mb-4">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="User Avatar"
                width={80}
                height={80}
                className="mx-auto rounded-full border-2 border-white/20 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-white">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium">{session.user.name}</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm">{session.user.email}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = `/${callbackurl}`}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              <ChefHat className="w-5 h-5" />
              Continue to Recipes
            </button>

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all duration-200 border border-white/20 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSigningOut ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LogOut className="w-5 h-5" />
              )}
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-white/5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to RecipeHub
          </h1>
          <p className="text-slate-400 text-sm">Sign in to save your favorite recipes and create custom collections</p>
        </div>

        {/* Sign In Options */}
        <div className="space-y-4">
          <button
            onClick={() => handleSignIn("google")}
            disabled={isSigningIn === "google"}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSigningIn === "google" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Chrome className="w-5 h-5" />
            )}
            {isSigningIn === "google" ? "Signing in..." : "Continue with Google"}
          </button>

          <button
            onClick={() => handleSignIn("github")}
            disabled={isSigningIn === "github"}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSigningIn === "github" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Github className="w-5 h-5" />
            )}
            {isSigningIn === "github" ? "Signing in..." : "Continue with GitHub"}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}