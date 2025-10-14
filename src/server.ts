import express from 'express';
import registerRoutes from './modules/register/register.routes';

const app = express()
const port = 3000

app.use(express.json());

app.use('/api', registerRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})