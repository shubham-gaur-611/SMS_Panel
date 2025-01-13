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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const student_model_1 = require("./student.model");
let StudentsService = class StudentsService {
    constructor(studentModel) {
        this.studentModel = studentModel;
    }
    async create(data) {
        return await this.studentModel.create(data);
    }
    async findAll() {
        return await this.studentModel.findAll();
    }
    async findOne(id) {
        const student = await this.studentModel.findByPk(id);
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID ${id} not found`);
        }
        return student;
    }
    async update(id, data) {
        const student = await this.findOne(id);
        await student.update(data);
        return student;
    }
    async remove(id) {
        const student = await this.findOne(id);
        await student.destroy();
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(student_model_1.Student)),
    __metadata("design:paramtypes", [Object])
], StudentsService);
//# sourceMappingURL=students.service.js.map