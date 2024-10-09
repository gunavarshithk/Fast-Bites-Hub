import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  name:{type:String},
  email: { type: String, required: true, unique: true },
  password: {
    type: String
  },
  image:{type:String},
},{timestamps:true});

// The Methodology to encrypt password using bcrypt module so that if anyone access the database cannot see the orginal

export const User=models?.User || model('User',UserSchema);