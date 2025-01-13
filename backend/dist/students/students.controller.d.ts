import { StudentsService } from './students.service';
import { Student } from './student.model';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(data: Partial<Student>, file: Express.Multer.File): Promise<Student>;
    findAll(): Promise<Student[]>;
    findOne(id: number): Promise<Student>;
    update(id: number, data: Partial<Student>, file: Express.Multer.File): Promise<Student>;
    remove(id: number): Promise<void>;
}
