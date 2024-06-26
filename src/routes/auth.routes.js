import {Router} from 'express'
import {login, logout, register, profile} from '../controllers/auth.controller.js'
import {authRequired} from '../middlewares/validateToken.js'

//Para crear multiples rutas
const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout )
router.get('/profile', authRequired , profile)

export default router