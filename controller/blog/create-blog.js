import Blog from "../../models/Blog.js";
import { createError } from "../../utils/error.js";

export default async ({ title, description, attachment, userId }) => {
    const isExist = await Blog.findOne({
        title,
        userId
    });

    if (isExist) throw createError('Blog already exist!', 403);

    const newBlog = {
        title,
        description,
        attachment,
        userId
    };

    await Blog.create(newBlog);

    return {
        message: 'Blog created successfully!'
    };
};