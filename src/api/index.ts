import express, { Router } from 'express'
import userRoutes from '../routes/user.routes'
import adminRouter from '../routes/admin.routes'

const router: Router = express.Router()

router.use('/user', userRoutes)
router.use('/admin', adminRouter)

export default router