import { Buildings } from "src/buildings/building.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Branches {
    @PrimaryGeneratedColumn('uuid')
    branch_uid: string
    @Column({ nullable: false })
    branch_name: string
    @Column({ nullable: false })
    branch_region: string
    @ManyToMany(() => Buildings, building => building.building_uid, { cascade: true })
    @JoinTable()
    branch_ref_building: Buildings[]
}