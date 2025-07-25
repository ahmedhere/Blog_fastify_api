import Blog from "../../models/Blog.js";
import { createError } from "../../utils/error.js";

export default async ({ _id, userId }) => {
    const blog = await Blog.findById(_id);

    if (!blog) throw createError('Id is invalid', 403);

    if (userId !== blog.userId) throw createError('You are not allowed this blog', 403);

    await Blog.findOneAndDelete({
        _id
    });

    return {
        message: 'Blog has deleted successfully!'
    }
}