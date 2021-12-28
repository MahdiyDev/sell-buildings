import { Branches } from "src/branches/branches.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    company_uid: string
    @Column({ nullable: false })
    company_name: string
    @Column({ nullable: false })
    company_info: string
    @ManyToMany(() => Branches, branch => branch.branch_uid, { cascade: true })
    @JoinTable()
    company_ref_branch: Branches[]
}