import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
@Unique(["email"])
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

  @CreateDateColumn(
    {
      name: 'created_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP(6)'
    }
  )
  createdAt: Date;

  @UpdateDateColumn(
    { 
      name: 'updated_at',
      type: 'timestamptz',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    }
  )
  updatedAt: Date;
}