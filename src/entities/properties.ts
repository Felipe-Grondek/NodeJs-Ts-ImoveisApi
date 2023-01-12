import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Addreses } from "./addreses";
import { Categories } from "./categories";
import { SchedulesUsersProperties } from "./schedulesUsersProperties";

@Entity("properties")
export class Properties {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: false })
    sold: boolean;

    @Column("decimal", { precision: 12, scale: 2 })
    value: number;

    @Column("integer")
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Addreses, (address) => address.properties)
    @JoinColumn()
    address: Addreses;

    @ManyToOne(() => Categories, (categories) => categories.properties)
    category: string;

    @OneToMany(() => SchedulesUsersProperties, (schedulesUsersProperties) => schedulesUsersProperties.property)
    schedules: SchedulesUsersProperties[];
}