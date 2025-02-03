import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Timer } from '../../timers/entities/timer.entity';
import { BreakDurationSpans } from '../../breaks/enums/break-duration.enum';

@Entity({ name: 'breaks' })
export class Break {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  breakNumber: number;

  @ManyToOne(() => Timer, (timer) => timer.breaks)
  timer: Timer;

  @Column(
    { 
      type: 'enum',
      enum: BreakDurationSpans,
    }
  )
  breakDuration: BreakDurationSpans;

  @CreateDateColumn(
    {
      type: 'timestamp',
    }
  )
  startTime: Date;

  @Column(
    {
      type: 'timestamp',
    }
  )
  endTime: Date;

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