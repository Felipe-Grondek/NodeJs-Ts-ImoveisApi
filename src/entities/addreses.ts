import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties";

@Entity("address")
export class Addreses {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    district: string;

    @Column()
    zipCode: string;

    @Column({ nullable: true })
    number: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @OneToOne(() => Properties, (properties) => properties.address)
    properties: Properties
}