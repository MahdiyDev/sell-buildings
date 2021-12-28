import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Banks {
    @PrimaryGeneratedColumn('uuid')
    bank_uid: string
    @Column({ default: null })
    bank_img: string
    @Column({ nullable: false })
    bank_name: string
    @Column({ nullable: false })
    bank_credit_num: number
}