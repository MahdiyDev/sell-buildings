import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    admin_uid: string
    @Column({ nullable: false })
    admin_email: string
    @Column({ nullable: false })
    admin_password: string
}