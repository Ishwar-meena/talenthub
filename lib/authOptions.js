import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import connectDb from '@/db/connection';
import User from '@/models/Users';


const nextSecret = process.env.NEXTAUTH_SECRET;
if(!nextSecret){
    throw new Error("Add NEXTAUTH_SECRET");
}

export const authOptions = {
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
            const existUser = await User.findOne({email:user.email});
            if(!existUser){
                User.create(
                    {
                        username:user.email,
                        email:user.email,
                        avatar:user.image,
                    }
                )
            }
            return true;
        }
    },
    secret : process.env.NEXTAUTH_SECRET,
}