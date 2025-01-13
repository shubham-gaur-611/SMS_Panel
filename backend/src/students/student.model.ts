import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Students',
  timestamps: true,
})
export class Student extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dob: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  branch: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 8,
    },
  })
  semester: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  photo: string;
}
