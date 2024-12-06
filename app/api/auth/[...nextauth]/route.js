import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {connectToDB} from "@utils/database"
import User from "@models/user";



const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({ session }) {
            try {
                await connectToDB();
                const sessionUser = await User.findOne({ email: session.user.email });
        
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                } else {
                    console.error("User not found for email:", session.user.email);
                }
        
                return session;
            } catch (error) {
                console.error("Session Callback Error:", error.message || error);
                return session; // Return the unmodified session in case of an error
            }
        },
    async signIn ({profile}){
        console.log("Google Profile: ", profile);
        try {
            await connectToDB();

            //Check if a user already exists
            const userexists = await User.findOne({
                email: profile.email
            });

            //if not, create a new user
            if (!userexists){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image:profile.picture
                })

            }

            return true;
        } catch (error) {
            console.log("SignIn Error:", error.message || error);
            return false;
            
        }
    }
}
})


export {handler as GET, handler as POST};
