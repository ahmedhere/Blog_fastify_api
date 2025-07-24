import Fastify from "fastify";
import passport from "passport";
import { JWTAuthStrategy, LocalLoginStrategy } from "./middleware/auth.js";
import { PORT } from "./config/env.js";
import routes from "./routes/index.js";
import { connectDB } from "./config/mongoDb.js";

const fastify = Fastify({
    logger: true
});

fastify.register(passport.initialize());
passport.use(LocalLoginStrategy);
passport.use(JWTAuthStrategy);

fastify.register(routes, {
    prefix: '/api'
});

fastify.setErrorHandler((error, req, res) => {
    res
        .status(error.statusCode || 500)
        .send({
            error: error.message
        });
})

const start = async () => {
    try {
        await fastify.listen({ port: PORT });
        connectDB();
        console.log(`server is listening on ${PORT}`);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start();