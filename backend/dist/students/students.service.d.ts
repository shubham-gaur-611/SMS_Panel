import { Student } from './student.model';
export declare class StudentsService {
    private studentModel;
    constructor(studentModel: typeof Student);
    create(data: Partial<Student>): Promise<Student>;
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<Student>;
    update(id: number, data: Partial<Student>): Promise<Student>;
    remove(id: number): Promise<void>;
}
