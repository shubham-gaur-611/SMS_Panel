"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const jwt_1 = require("@nestjs/jwt");
exports.jwtConfig = jwt_1.JwtModule.register({
    secret: 'your-secret-key',
    signOptions: { expiresIn: '1d' },
});
//# sourceMappingURL=jwt.config.js.map