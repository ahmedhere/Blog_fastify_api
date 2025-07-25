import { model, Schema, Types } from "mongoose";

const blogSchema = new Schema({
    _id: {
        type: String,
        default: new Types.ObjectId().toHexString(),
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    attachment: {
        type: String
    },
    userId: {
        type: String
    }
});

const Blog = model('blog', blogSchema);

export default Blog;