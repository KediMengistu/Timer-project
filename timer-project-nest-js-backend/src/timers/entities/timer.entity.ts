import { Entity, Unique, Check, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BreakDurationSpans } from '../../breaks/enums/break-duration.enum';
import { Break } from '../../breaks/entity/break.entity';

@Entity({ name: 'timers' })
@Unique(['title'])
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

  @Column(
    {
      type: 'timestamp',
      nullable: true,
      default: null
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

  @OneToMany(() => Break, (breakEntity) => breakEntity.timer)
  breaks: Break[];

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