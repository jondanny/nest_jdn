import { registerAs } from '@nestjs/config';

export default registerAs('jwtConfig', () => ({
  secret: process.env.JWT_SECRET,
  accessTokenDurationMinutes: process.env.JWT_ACCESS_TOKEN_DURATION_MINUTES,
}));
