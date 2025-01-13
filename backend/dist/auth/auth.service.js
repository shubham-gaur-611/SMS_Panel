"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
let AuthService = class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(email, password) {
        const existingUser = await this.userModel.findOne({ where: { email } });
        if (existingUser) {
            return { message: 'User already exists' };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userModel.create({ email, password: hashedPassword });
        return { message: 'Registration successful' };
    }
    async validateUser(email, password) {
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map