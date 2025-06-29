import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import connectDb from '@/db/connection';
import User from '@/models/Users';


const nextSecret = process.env.NEXTAUTH_SECRET;
if (!nextSecret) {
    throw new Error("Add NEXTAUTH_SECRET");
}

export  const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            await connectDb();
            // check user exist or not 
            const existUser = await User.findOne({ email: user.email });
            if (!existUser) {
                User.create(
                    {
                        username: user.name,
                        email: user.email,
                        avatar: user.image,
                        admin:user.email === process.env.ADMIN_EMAIL?true:false,
                    }
                )
            }
            return true;
        },
        async session({ session }) {
            await connectDb();
            const user = await User.findOne({ email: session.user.email });
            session.user.id = user._id;
            session.user.admin = user.admin;
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

