import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import JWT from 'jsonwebtoken'
import { check, validationResult, ValidationError, Result } from 'express-validator'

import User, { Register } from '../models/User.models'
const router = Router()
dotenv.config()

// /api/auth/register
router.post("/register",
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'minimum length is 6')
      .isLength({ min: 6 })
  ], 
  async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      //validation
      const errors: Result<ValidationError> = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "error"
        })
      }
      // ---------   
      const { 
        email, 
        password
      } = req.body as Register

      const candidate: Register | null = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "Email is taken" })
      }
      const hashedPassword: string = await bcrypt.hash(password, bcrypt.genSaltSync(10) )
      const user: Register = new User({ email, password: hashedPassword })
      
      await user.save();
      return res.status(201).json({ message: "user created" })

    } catch (e) {
      return res.status(500).json({ message: "something went wrong " + e.message })
    }
  })

// /api/auth/login
router.post("/login",
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'write password').exists()
  ],
  async (req: Request, res: Response) => {
    console.log(req.body)
    try {
      //validation
      const errors: Result<ValidationError> = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "error"
        })
      }
      // ---------   
      const {
        email,
        password
      } = req.body as Register
      const user: Register | null = await User.findOne({ email })
      
      if (!user) {
        return res.status(400).json({ message: "Email or/and password are wrong" })
      }
      const isMatch: boolean = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: "Email or/and password are wrong" })
      }

      const key: string = process.env.JWTSecret as string

      const token = JWT.sign(
        { userId: user.id },
        key,
        { expiresIn: '1h' }
      )
      res.json({ token, userId: user.id })
    } catch (e) {
      return res.status(500).json({ message: "something went wrong " + e.message})
    }
  })

export { router }