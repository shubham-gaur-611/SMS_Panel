import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async register(email: string, password: string): Promise<{ message: string }> {
    const existingUser = await this.userModel.findOne({ where: { email } });
    if (existingUser) {
      return { message: 'User already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userModel.create({ email, password: hashedPassword });
    return { message: 'Registration successful' };
  }

  async validateUser(email: string, password: string): Promise<{ message: string, user?: { email: string }, token?: string, expiresIn?: number }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const expiresIn = parseInt(process.env.JWT_EXPIRES_IN) || 20;
      const token = jwt.sign({ email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: `${expiresIn}s` });
      return { 
        message: 'Login successful',
        user: { email: user.email },
        token: token,
        expiresIn: expiresIn
      };
    }
    
    throw new Error('Invalid credentials');
  }
}
