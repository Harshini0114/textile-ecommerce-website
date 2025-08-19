import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.json({ success: false, message: "Token not found" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token:", token);
        console.log("Decoded Token:", token_decode);

        const expectedPayload = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
        console.log("Expected Payload:", expectedPayload);

        if (expectedPayload !== token_decode.id) {
            return res.json({ success: false, message: "Not authorized" });
        }
        console.log("authenticated")
        next();
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
};

export default adminAuth;
