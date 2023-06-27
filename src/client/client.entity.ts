import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  avatar: string;

  @Column({ type: 'varchar', nullable: false, array: true })
  photos: string[];

  @Column({ type: 'int', nullable: false })
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
