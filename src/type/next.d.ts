// types/next.d.ts
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    file?: Express.Multer.File; // Importing the type from multer
  }
}