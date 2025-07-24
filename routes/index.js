import auth from "./auth.js";
function routes(fastify, options, done) {
    fastify.register(auth, { prefix: '/auth' })
    done();
};

export default routes;