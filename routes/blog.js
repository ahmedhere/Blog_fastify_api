import { CreateBlog, DeleteBlog, GetBlog, UpdateBlog } from "../controller/blog/index.js";
import { authenticateAuthToken } from "../middleware/auth.js";
import { createError } from "../utils/error.js";

const createBlogOptions = {
    schema: {
        tags: ['Blog'],
        security: [{ bearerAuth: [] }],
        body: {
            type: 'object',
            properties: {
                attachment: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                },
                title: {
                    type: 'string'
                }
            }
        },
        response: {
            200: {
                message: {
                    type: 'string'
                }
            }
        }
    },
    preValidation: authenticateAuthToken,
    handler: async (req, res) => {
        try {
            const {
                body: {
                    attachment,
                    description,
                    title
                },
                user,
                error
            } = req;
            if (error) throw createError(error, 403);
            const result = await CreateBlog({
                attachment,
                description,
                title,
                userId: user?._id
            });
            res.send(result);
        } catch (error) {
            throw error;
        }
    }
}

const getBlogOptions = {
    schema: {
        tags: ['Blog'],
        query: {
            type: 'object',
            required: ['page', 'pageSize'],
            properties: {
                _id: {
                    type: 'string'
                },
                search: {
                    type: "string"
                },
                page: {
                    type: "number"
                },
                pageSize: {
                    type: "number"
                }
            }
        },
        response: {
            200: {
                type: 'array',
                items: {
                    count: {
                        type: 'number'
                    },
                    rows: {

                        type: 'object',
                        properties: {
                            _id: {
                                type: 'string'
                            },
                            title: {
                                type: 'string'
                            },
                            description: {
                                type: 'string'
                            },
                            attachment: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    },
    handler: async (req, res) => {
        try {
            const {
                query: {
                    page,
                    pageSize,
                    search,
                    _id
                }
            } = req;
            const result = await GetBlog({
                _id,
                search,
                page,
                pageSize
            });
            res.status(201).send(result);
        } catch (error) {
            throw error;
        }
    }
}

const updateBlogOptions = {
    schema: {
        tags: ['Blog'],
        security: [{ bearerAuth: [] }],
        params: {
            type: 'object',
            properties: {
                _id: {
                    type: 'string'
                }
            }
        },
        body: {
            type: 'object',
            properties: {
                title: {
                    type: 'string'
                },
                description: {
                    type: 'string'
                },
                attachment: {
                    type: 'string'
                }
            }
        },
        response: {
            200: {
                message: 'Blog updated successfully!'
            }
        }
    },
    preValidation: authenticateAuthToken,
    handler: async (req, res) => {
        try {
            const {
                params: {
                    _id
                },
                body: {
                    description,
                    title
                },
                user,
                error
            } = req;
            if (error) throw createError(error, 403);
            const result = await UpdateBlog({
                _id,
                description,
                title,
                userId: user._id
            });
            res.status(201).send(result);
        } catch (error) {
            throw error;
        }
    }
}

const deleteBlogOptions = {
    schema: {
        tags: ['Blog'],
        security: [{ bearerAuth: [] }],
        params: {
            type: 'object',
            properties: {
                _id: {
                    type: 'string'
                }
            }
        },
        response: {
            200: {
                message: 'Blog deleted successfully!'
            }
        }
    },
    preValidation: authenticateAuthToken,
    handler: async (req, res) => {
        try {
            const {
                params: {
                    _id
                },
                user,
                error
            } = req;
            if (error) throw createError(error, 403);
            const result = await DeleteBlog({
                _id,
                userId: user._id
            });
            res.status(201).send(result);
        } catch (error) {
            throw error;
        }
    }
};
export default (fastify, options, done) => {
    fastify.post('/', createBlogOptions);
    fastify.get('/', getBlogOptions);
    fastify.patch('/:_id', updateBlogOptions);
    fastify.delete('/:_id', deleteBlogOptions);
    done();
}