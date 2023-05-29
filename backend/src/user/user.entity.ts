import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
} from 'typeorm';
import { VideoSharing } from '../video-sharing/video-sharing.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @OneToMany(() => VideoSharing, (videoSharing) => videoSharing.owner)
  sharing: VideoSharing[];
}
