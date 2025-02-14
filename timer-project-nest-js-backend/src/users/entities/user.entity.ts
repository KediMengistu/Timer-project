import { Entity, Unique, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Timer } from '../../timers/entities/timer.entity';
import { UserVerificationStatus } from '../enums/user-verification-status.enum';

@Entity({ name: 'users' })
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => Timer, (timer) => timer.user)
  timers: Timer[];

  @Column(
    {
      type: 'int',
      default: 0 
    }
  )
  numberOfTimers: number;

  @Column({
    nullable: true,
    default: null
  })
  verificationCode: string;

  @Column({
    nullable: true,
    default: null
  })
  verificationCodeExpireTime: Date;

  @Column(
    { 
      type: 'enum',
      enum: UserVerificationStatus,
      default: UserVerificationStatus.NOT_VERIFIED
    }
  )
  isVerified: string;

  @Column(
    { 
      type: 'timestamp',
      default: null
    }
  )
  previousSigninTime: Date;

  @Column(
    { 
      type: 'timestamp',
      default: null
    }
  )
  userAccountExpirationTime: Date;

  @CreateDateColumn(
    {
      name: 'created_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)'
    }
  )
  createdAt: Date;

  @UpdateDateColumn(
    { 
      name: 'updated_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    }
  )
  updatedAt: Date;
}