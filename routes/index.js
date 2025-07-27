import auth from "./auth.js";
import blog from "./blog.js";
import upload from "./upload.js";
function routes(fastify, options, done) {
    fastify.register(auth, { prefix: '/auth' })
    fastify.register(upload, { prefix: '/upload' })
    fastify.register(blog, { prefix: '/blog' })
    done();
};

export default routes;