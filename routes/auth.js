import {
    Signin,
    Signup
} from "../controller/auth/index.js";
import { loginCheck } from "../middleware/auth.js";
import { createError } from "../utils/error.js";

const signinOption = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    token: {
                        type: 'object',
                        properties: {
                            userId: {
                                type: 'string'
                            },
                            token: {
                                type: 'string'
                            }
                        }
                    }
                }
            }
        }
    },
    preValidation: loginCheck,
    handler: async (req, res) => {
        try {
            const { user, error } = req;
            if (error) throw createError(error, 403);
            const result = await Signin({ user });
            console.log(result);
            res.send(result);
        } catch (error) {
            throw error;
        }
    }
}

const signUpOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: {
                    type: 'string'
                },
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                }
            }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        }
    },
    handler: async (req, res) => {
        try {
            const {
                body: {
                    name,
                    email,
                    password
                }
            } = req;
            const result = await Signup({
                email,
                name,
                password
            });
            res.status(201).send(result);
        } catch (error) {
            throw error;
        }
    }
}

export default (fastify, options, done) => {
    fastify.post('/signin', signinOption);
    fastify.post('/signup', signUpOptions);
    done();
}