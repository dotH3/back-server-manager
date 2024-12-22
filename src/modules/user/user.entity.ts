import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @Transform(({ value }: { value: string }) => value.trim().toLowerCase())
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  @MaxLength(50, {
    message: 'El nombre de usuario debe tener como máximo 50 caracteres',
  })
  username: string;

  @Column({ select: false })
  @IsAlphanumeric('en-US', {
    message: 'La contraseña debe contener solo letras y números',
  })
  @Transform(({ value }) => value.trim())
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @MaxLength(50, {
    message: 'La contraseña no debe exceder los 50 caracteres',
  })
  password: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;
}
