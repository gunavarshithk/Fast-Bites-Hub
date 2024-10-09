import mongoose from "mongoose";
import NextAuth from "next-auth/next";
import { User } from '../../../models/User';
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { UserInfo } from "../../../models/UserInfo";

export const authOptions1={
  secret:process.env.SECRET,
    providers: [  
        CredentialsProvider({
        name: "Credentials",
        id:'credentials',
        credentials: {
            username: { label: "Email", type: "email", placeholder: "test@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // const {email,password}=credentials;
            const email=credentials?.email;
            const password=credentials?.password;
            mongoose.connect(process.env.MONGO_URL);
            const user=await User.findOne({email});
            const passwordOk=user && bcrypt.compareSync(password,user.password);
            if(passwordOk){
                return user;
            }
            return null;
          }
        })
      ],
}

export async function isAdmin() {
  const session = await getServerSession(authOptions1);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({email:userEmail});
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler= NextAuth(authOptions1);

export {handler as GET,handler as POST}