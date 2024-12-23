// import session from 'express-session';
// import MongoStore from 'connect-mongo';
// import dotenv from 'dotenv';
// import { getOrCreateSecretKey } from './secrets.js';

// dotenv.config();

// const SECRET_KEY = getOrCreateSecretKey();

// export const sessionConfig = session({
//   secret: SECRET_KEY,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGODB_URI,
//     ttl: 24 * 60 * 60, // Session TTL (1 day)
//   }),
//   cookie: {
//     secure: process.env.NODE_ENV === 'production',
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
//   },
// });
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getOrCreateSecretKey } from './secrets.js';

dotenv.config();

const SECRET_KEY = getOrCreateSecretKey();

// Use Mongoose's connection directly to avoid issues
const mongoClientPromise = mongoose.connect(process.env.MONGODB_URI).then(mongoose => mongoose.connection.getClient());

export const sessionConfig = session({
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    clientPromise: mongoClientPromise,  // Use clientPromise instead of mongoUrl
    ttl: 24 * 60 * 60, // 1 day
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  },
});
