// import { prisma } from "@/pages/lib/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     // ...add more providers here
//   ],
// };
// export default NextAuth(authOptions);

import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
});
