import 'dotenv/config.js'

export const corsOptions = {
  origin: [`${process.env.WHITELISTED_DOMAINS}`],
  methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
  credentials: true,
}
