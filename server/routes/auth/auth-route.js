
import express from 'express'
import { loginUser, logoutUser, registerUser } from '../../controllers/auth/auth-controller.js';
import { checkAuthenticated } from '../../middlewares/checkAuth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.get('/checkAauth', checkAuthenticated, async (req, res) => {
    const user = req.user
    return res.status(201).json({
        success: true,
        mesaage: "Authenticated User !",
        user
    });
})

export default router;