import Blog from "../../models/Blog.js";

export default async ({
    _id,
    page = 0,
    pageSize = 15,
    search
}) => {
    const filter = {};

    const skip = parseFloat(page) * parseFloat(pageSize);

    if (_id) {
        filter._id = _id;
    }
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ]
    }

    const result = await Blog.aggregate([
        {
            $match: filter
        }, {
            $skip: skip
        }, {
            $limit: parseFloat(pageSize)
        }
    ]);

    return result;
};