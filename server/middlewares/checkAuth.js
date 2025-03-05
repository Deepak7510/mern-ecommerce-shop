import JsonWebToken from "jsonwebtoken"

export const checkAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised User !"
        })
    }
    try {
        const decode =JsonWebToken.decode(token, process.env.SECRET_KEY);
        req.user = decode
        next();
    } catch (error) {
        console.log(error)
        return res.status().json({
            success: false,
            message: "Unauthorised User !"
        })
    }

}