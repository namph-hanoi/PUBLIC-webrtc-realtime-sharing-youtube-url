import {
  Unique,
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
import * as bcrypt from 'bcryptjs';

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  salt: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @OneToMany(() => VideoSharing, (videoSharing) => videoSharing.owner)
  sharing: VideoSharing[];

  async validateInputPassword(inputPassword: string): Promise<boolean> {
    const saltedInput = await bcrypt.hash(inputPassword, this.salt);
    return saltedInput === this.password;
  }
}
