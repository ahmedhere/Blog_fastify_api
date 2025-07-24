import { Types } from "mongoose";
import User from "../../models/User.js";
import { createError } from "../../utils/error.js";

export default async ({ name, email, password }) => {

    if (!name || !email || !password) throw createError('Required fields are missing!', 403);

    const isExist = await User.findOne({
        email
    });
    if (isExist) throw createError('User already registered', 403);

    const _id = new Types.ObjectId().toHexString();

    const newUser = {
        _id,
        name,
        email,
        password
    }

    await User.create(newUser);

    return {
        message: 'User sign-up successfully!'
    };
};