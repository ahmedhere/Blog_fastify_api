import { generateToken } from "../../middleware/auth.js";

const SignIn = ({
    user
}) => {
    const {
        _id,
        name,
        email
    } = user;
    const token = generateToken({ _id, name, email });

    return {
        _id,
        name,
        email,
        token
    };
};

export default SignIn;