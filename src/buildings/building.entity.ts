import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Buildings {
    @PrimaryGeneratedColumn('uuid')
    building_uid: string
    @Column({ nullable: false })
    building_room_count: number
    @Column({ nullable: false })
    building_info: string
}