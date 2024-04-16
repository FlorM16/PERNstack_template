import {Router} from 'express'
import {login, register} from '../controllers/auth.controller.js'

//Para crear multiples rutas
const router = Router()

router.post('/register', register)
router.post('/login', login)

export default router