import express from 'express';
import cookieParser from 'cookie-parser';
import registerRoutes from './modules/auth/auth.routes';

const app = express()
const port = 3000

app.use(cookieParser());
app.use(express.json());

app.use('/api', registerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})