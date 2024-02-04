import Anchor from '@/models/anchor.model'
import { CorsOptions } from 'cors'

const CorsWhiteList: string[] = []

export async function CorsWhiteListUpdate() {
  const paths = await Anchor.find({ select: ['pathName'] })
  if (process.env.MAIN_DOMAIN && process.env.BASE_DOMAIN) {
    CorsWhiteList.push(process.env.MAIN_DOMAIN)
    paths.forEach((item) => {
      CorsWhiteList.push(`${item}.${process.env.BASE_DOMAIN}`)
    })
  }
}

export const CorsOptionData: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && CorsWhiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
