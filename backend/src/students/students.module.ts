import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './student.model';

@Module({
  imports: [SequelizeModule.forFeature([Student])],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
