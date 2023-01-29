import express from 'express';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const posts = await prisma.post.findMany();
  if (!posts) res.status(404).json({ message: 'Not found' });
  else res.json(posts);
  // res.json({ hello: 'world!!!' });
});

const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
