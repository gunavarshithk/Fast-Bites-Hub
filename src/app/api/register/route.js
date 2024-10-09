import { User } from "@/app/models/User";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
export async function POST(req) {
const body = await req.json();
mongoose.connect(process.env.MONGO_URL);
const pass=body.password;
    if (!pass?.length > 5 || pass.length < 5) {
    new Error("password must be atleast 5 characters");
    };

    const notHasedPassword=pass;
  const salt=bcrypt.genSaltSync(10);
  body.password=bcrypt.hashSync(notHasedPassword,salt);

const createdUser = await User.create(body);
return Response.json(createdUser);
}
