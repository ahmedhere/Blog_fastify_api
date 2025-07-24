import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
    if (this.modified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = model('user', userSchema);

export default User;