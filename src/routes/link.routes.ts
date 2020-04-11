import { Router, Response, Request } from 'express'
import Link from '../models/Link.models'
import auth, { UserAuthInfo } from './../middleware/auth.middleware'
import shortid from 'shortid'
import dotenv from 'dotenv'
dotenv.config()

const router = Router()

router.post('/generate', auth, async (req: UserAuthInfo, res: Response) => {
  try {
    const { from } = req.body

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing })
    }
    const code = shortid.generate()

    const to = `${process.env.baseURL}/t/${code}`

    const User = req.user as {
      userId: string;
      token: string;
    } 
    const link = new Link({
      code, to, from, owner: User.userId, clicks: 0
    })

    await link.save()
    console.log(link)
    return res.status(201).json({ link })
  } catch (e) {
    return res.status(500).json({ message: "something went wrong " + e.message})
  }
})

router.get('/', auth, async (req: UserAuthInfo, res: Response) => {
  try {
    const User = req.user as {
      userId: string;
      token: string;
    } 
    const links = await Link.find({ owner: User.userId  })
    return res.json(links)
  } catch (e) {
    return res.status(500).json({ message: "something went wrong " + e.message})
  }
})

router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const link = await Link.findById(req.params.id)
    return res.json(link)
  } catch (e) {
    return res.status(500).json({ message: "something went wrong " + e.message})
  }
})


export { router }