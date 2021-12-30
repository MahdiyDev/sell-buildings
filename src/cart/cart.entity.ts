import { Banks } from "src/banks/banks.entity";
import { Branches } from "src/branches/branches.entity";
import { Buildings } from "src/buildings/building.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    cart_uid: string
    @Column({ nullable: false })
    cart_email: string
    @OneToOne(() => Branches, { cascade: true })
    @JoinColumn()
    cart_branch: Branches;
    @OneToOne(() => Banks, { cascade: true })
    @JoinColumn()
    cart_bank: Banks;
    @ManyToMany(() => Buildings, building => building.building_uid, { cascade: true })
    @JoinTable()
    cart_ref_building: Buildings[]
}