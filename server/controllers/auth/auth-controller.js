// register
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import UserModel from '../../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if all required fields are provided
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.' // 400 Bad Request - Missing required fields
            });
        }

        // Check if the user is already registered
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: 'User already registered.' // 409 Conflict - User already exists
            });
        }

        // Hash the password before storing it in the database
        const hashPassword = await bcryptjs.hash(password, 10);
        const newUser = new UserModel({
            userName,
            email,
            password: hashPassword
        });

        // Save the new user to the database
        await newUser.save();
        return res.status(201).json({ // 201 Created - User successfully registered
            success: true,
            message: 'Account created successfully.'
        });
    } catch (error) {
        console.error(error); // Log the error for debugging

        return res.status(500).json({ // 500 Internal Server Error - Something went wrong
            success: false,
            message: 'An error occurred while registering the user.'
        });
    }
};



// login 

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all required fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.' // 400 Bad Request - Missing required fields
            });
        }
        // Check if the user exists
        const checkUser = await UserModel.findOne({ email });
        if (!checkUser) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password." // 401 Unauthorized - Invalid credentials
            });
        }

        // Validate the password
        const checkPassword = await bcryptjs.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password." // 401 Unauthorized - Invalid credentials
            });
        }

        // Generate JWT token
        const token = jsonwebtoken.sign({
            id: checkUser._id,
            email: checkUser.email,
            role: checkUser.role,
            userName: checkUser.userName
        }, process.env.SECRET_KEY, { expiresIn: '1d' });


        // Send the token in a cookie
        return res.status(200).cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: false,  // Set to true in production with HTTPS
            sameSite: 'Strict', // Prevents CSRF attacks
            maxAge: 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: "Login successful.", // 200 OK - User successfully logged in
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        });

    } catch (error) {
        console.error(error); // Log the error for debugging

        return res.status(500).json({ // 500 Internal Server Error - Something went wrong
            success: false,
            message: 'An error occurred while logging in.',

        });
    }
};


// logout

export const logoutUser = async (req, res) => {
    try {
        res.status(201).clearCookie('token').json({
            success: true,
            message: "Logged successfully."
        })
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ // 500 Internal Server Error - Something went wrong
            success: false,
            message: 'An error occurred while logging in.',
        });
    }
}


// auth-middleware
