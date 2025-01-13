import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { jwtConfig } from '../config/jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    jwtConfig
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [jwtConfig] 
})
export class AuthModule {}
