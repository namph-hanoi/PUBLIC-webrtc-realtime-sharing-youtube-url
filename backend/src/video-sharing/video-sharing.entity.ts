import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'video_sharings' })
export class VideoSharing {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  link: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  thumbnail_link: string;

  @ManyToOne(() => User, (user) => user.sharing)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
