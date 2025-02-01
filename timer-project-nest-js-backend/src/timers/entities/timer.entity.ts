import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, Check } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BreakDurationSpans } from './break-duration.enum';

@Entity({ name: 'timers' })
@Unique(["title"])
@Check(`"durationHours" >= 1 AND "durationHours" < 25`)
@Check(`"durationMinutes" > 0 AND "durationMinutes" < 60`)
@Check(`"durationSeconds" > 0 AND "durationSeconds" < 60`)
export class Timer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.timers)
  user: User;

  @CreateDateColumn(
    {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)'
    }
  )
  startTime: Date;

  @CreateDateColumn(
    {
      type: 'timestamp',
      nullable: true
    }
  )
  endTime: Date;

  @Column({ type: 'int' })
  durationHours: number;

  @Column({ type: 'int' })
  durationMinutes: number;

  @Column({ type: 'int' })
  durationSeconds: number;

  @Column(
    { 
      type: 'enum',
      enum: BreakDurationSpans,
      default: BreakDurationSpans.SHORT
    }
  )
  breakDuration: BreakDurationSpans;

  @Column(
    { 
      type: 'int',
      nullable: true
    }
  )
  numberOfBreaks: number;

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