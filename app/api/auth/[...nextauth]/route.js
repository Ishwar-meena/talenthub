import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

console.log("authOptions? ", typeof authOptions, authOptions?.providers?.length);

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };