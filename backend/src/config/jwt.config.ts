import { JwtModule } from '@nestjs/jwt';

export const jwtConfig = JwtModule.register({
  secret: 'your-secret-key', // In production, use environment variable
  signOptions: { expiresIn: '1d' },
});
