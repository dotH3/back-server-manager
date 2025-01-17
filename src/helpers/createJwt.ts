import { BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const createJwt = async (data: object, expiresIn = '50000d') => {
  // createdAt 17/01/2025
  //26 de septiembre de 2038 expires
  const payload = { ...data };
  const secretKey = process.env.JWTKEY;
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

export const decryptToken = (token: string) => {
  const secretKey = process.env.JWTKEY;
  let data = null;
  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      throw new BadRequestException('token not valid');
    } else {
      data = decoded;
    }
  });
  return data;
};
