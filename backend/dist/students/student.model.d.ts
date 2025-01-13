import { Model } from 'sequelize-typescript';
export declare class Student extends Model {
    id: number;
    name: string;
    email: string;
    dob: Date;
    branch: string;
    semester: number;
    photo: string;
}
