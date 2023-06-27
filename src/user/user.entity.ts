import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 25 })
  firstName: string;

  @Column({ type: 'varchar', nullable: false, length: 25 })
  lastName: string;

  @Column({ type: 'varchar', nullable: false })
  fullName: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 50 })
  role: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  updatedAt: Date;
}
