import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'viberveronwwepfiwep';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secreto';

export function tokenGenerator(payload: object) {

  const activeEmailToken = jwt.sign(payload, JWT_SECRET);

  return { activeEmailToken };
};