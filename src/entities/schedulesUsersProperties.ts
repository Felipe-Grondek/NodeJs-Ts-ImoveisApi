import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties";
import { Users } from "./users";


@Entity("schedules_users_properties")
export class SchedulesUsersProperties {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "date" })
    date: string;

    @Column({ type: "time" })
    hour: string;

    @ManyToOne(() => Properties, (properties) => properties.schedules)
    @JoinColumn()
    property: Properties;

    @ManyToOne(() => Users, (users) => users.scheduleUsersProperties)
    @JoinColumn()
    user: Users;
}