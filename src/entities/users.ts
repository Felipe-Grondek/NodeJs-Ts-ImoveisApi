import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from "typeorm";
import { hashSync } from "bcryptjs";
import { SchedulesUsersProperties } from "./schedulesUsersProperties";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 128 })
    name: string;

    @Column({ length: 128, unique: true })
    email: string;

    @Column({ length: 128 })
    password: string;

    @Column()
    isAdm: boolean;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => SchedulesUsersProperties, (schedulesUsersProperties) => schedulesUsersProperties.user)
    scheduleUsersProperties: SchedulesUsersProperties[];

    @BeforeInsert()
    hashPass() {
        this.password = hashSync(this.password, 10)
    }
};