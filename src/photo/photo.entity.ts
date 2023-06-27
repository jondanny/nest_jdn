import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
