import auth from "./auth.js";
import upload from "./upload.js";
function routes(fastify, options, done) {
    fastify.register(auth, { prefix: '/auth' })
    fastify.register(upload, { prefix: '/upload' })
    done();
};

export default routes;