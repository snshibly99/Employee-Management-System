import express from 'express'
import { login, verify, getUsers } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddlware.js'

const router = express.Router()

router.post('/login', login)
router.get('/verify', authMiddleware, verify)
router.get('/getUsers', getUsers)

export default router;