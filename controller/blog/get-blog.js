import Blog from "../../models/Blog.js";

export default async ({
    _id,
    page = 1,
    pageSize = 15,
    search
}) => {
    const filter = {};

    const skip = parseFloat(page - 1) * parseFloat(pageSize);

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

    const count = await Blog.countDocuments(filter);

    return {
        rows: result,
        count
    };
};