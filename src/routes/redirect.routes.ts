import { Document } from 'mongoose'
import { Router, Request, Response } from 'express'
import Link from '../models/Link.models'
const router = Router()

export interface LinkObj extends Document {
  _id: string;
  clicks: number;
  code: string;
  to: string;
  from: string;  
  owner: string;
  date: string;
  __v: number;
}

router.get('/:code', async (req: Request, res: Response) => {
  try {
    const link = await Link.findOne({ code: req.params.code }) as  LinkObj | null
    if (link) {
      link.clicks++
      console.log(link)
      await link.save()
      return res.redirect(link.from)
    } 
    res.status(404).json('link no found')
  } catch (e) {
    res.status(500).json({ message: 'something went wrong' })
  }
})

export { router }