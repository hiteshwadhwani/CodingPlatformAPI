import express, { Router } from 'express'
import userRoutes from '../routes/user.routes'

const router: Router = express.Router()

router.use('/user', userRoutes)

export default router