import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
