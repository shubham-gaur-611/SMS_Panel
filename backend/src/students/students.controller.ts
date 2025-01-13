import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StudentsService } from './students.service';
import { Student } from './student.model';
import { storage, fileFilter } from '../common/helpers/file-upload.helper';


@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', {
    storage: storage,
    fileFilter: fileFilter
  }))
  async create(@Body() data: Partial<Student>, @UploadedFile() file: Express.Multer.File): Promise<Student> {
    if (file) {
      data.photo = `/assets/profile_images/${file.filename}`;
    }
    return await this.studentsService.create(data);
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return await this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    return await this.studentsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photo', {
    storage: storage,
    fileFilter: fileFilter
  }))
  async update(
    @Param('id') id: number,
    @Body() data: Partial<Student>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Student> {
    if (file) {
      data.photo = `/assets/profile_images/${file.filename}`;
    }
    return await this.studentsService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number): Promise<void> {
    await this.studentsService.remove(id);
  }
}
