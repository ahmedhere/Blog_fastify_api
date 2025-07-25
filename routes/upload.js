import fastifyMultipart from "@fastify/multipart";
import upload from "../config/upload.js";
import { createError } from "../utils/error.js";


export default (fastify, options, done) => {
    fastify.register(fastifyMultipart);
    fastify.post('/', {
        schema: {
            consumes: ['multipart/form-data'],
            body: {
                type: 'object',
                properties: {
                    file: {
                        type: "string",
                        format: 'binary'
                    }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        },
                        imageUrl: {
                            type: 'string'
                        },
                    }
                }
            }
        },
        preValidation: upload.single('file'),
        handler: async (req, res) => {
            try {
                const { file } = req;
                if (!file) throw createError('No file uploaded', 403);

                const imageUrl = file?.fileName;

                res.send({
                    message: 'File uploaded successfully!',
                    imageUrl
                });
            } catch (error) {
                throw error;
            }
        }
    });
    done();
}