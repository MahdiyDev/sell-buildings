import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sellers {
    @PrimaryGeneratedColumn('uuid')
    seller_uid: string
    @Column({ nullable: false })
    seller_email: string
    @Column({ nullable: false })
    seller_password: string
    @Column({ nullable: false })
    seller_type: string
}