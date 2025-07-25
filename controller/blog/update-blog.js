import Blog from "../../models/Blog.js";
import { createError } from "../../utils/error";

export default async ({
    _id,
    title,
    description,
    userId
}) => {
    const isExist = await Blog.findOne({
        title,
        userId,
        _id: { $ne: _id }
    });

    if (isExist) throw createError('Blog already exist!!!', 403);

    await Blog.findByIdAndUpdate(_id, {
        title,
        description
    });

    return {
        message: 'Blog updated successfully!'
    };
};