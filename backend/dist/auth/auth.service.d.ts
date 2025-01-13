import { User } from './user.model';
export declare class AuthService {
    private userModel;
    constructor(userModel: typeof User);
    register(email: string, password: string): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        message: string;
        user?: {
            email: string;
        };
        token?: string;
        expiresIn?: number;
    }>;
}
