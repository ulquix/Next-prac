// /app/api/auth/[...nextauth]/route.js
import { connectToDB } from "@/lib/db";
import User from "@/models/user";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ], callbacks: {
    async signIn({ user }) {
      await connectToDB();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          profilepic: user.image,
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/signout",
  },
  session: {
    strategy: "jwt", // or "database"
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60,   // how often to update the session (in seconds)
  }
  ,

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
