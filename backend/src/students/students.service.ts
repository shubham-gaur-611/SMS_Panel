import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}

  async create(data: Partial<Student>): Promise<Student> {
    return await this.studentModel.create(data);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentModel.findAll();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentModel.findByPk(id);
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(id: number, data: Partial<Student>): Promise<Student> {
    const student = await this.findOne(id);
    await student.update(data);
    return student;
  }

  async remove(id: number): Promise<void> {
    const student = await this.findOne(id);
    await student.destroy();
  }
}
