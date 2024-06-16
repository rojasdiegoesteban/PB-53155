import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
    fist_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number
});

export const userModel = mongoose.model(userCollection, userSchema);