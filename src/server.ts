import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import registerRoutes from './modules/auth/auth.routes';
import passwordRoutes from './modules/password/password.routes';
import userRoutes from './modules/user/user.routes';

const app = express()
const port = 3000

app.use(cors({
    origin: 'http://localhost:5174', // Permite apenas o frontend em localhost:5173
    credentials: true, // Permite envio de cookies e headers de autenticação
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api', registerRoutes);
app.use('/api', passwordRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})