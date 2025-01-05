import express from 'express'
<<<<<<< Updated upstream
import { login, verify } from '../controllers/authController.js'
=======
import { login, verify, getUsers, logout } from '../controllers/authController.js'
>>>>>>> Stashed changes
import authMiddleware from '../middleware/authMiddlware.js'

const router = express.Router()

router.post('/login', login)
router.get('/verify', authMiddleware, verify)
<<<<<<< Updated upstream
=======
router.get('/getUsers', getUsers)
router.post('/logout', authMiddleware, logout)
>>>>>>> Stashed changes

export default router;