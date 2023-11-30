import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name: "user"})
export class User extends BaseEntity {

    @Column({type: "varchar", nullable: false})
    name: string;

    @Column({type: "varchar", nullable: false})
    email: string;

    @Column({type: "varchar", nullable: false})
    password: string;

    @Column({type: "varchar", nullable: false})
    phone_number: string;

    @Column({type: "varchar", nullable: false})
    address: string;
    
    @Column({type: "varchar", nullable: false})
    bio: string;

    @Column({type: "varchar", nullable: false})
    github_link: string;

    @Column({type: "varchar", nullable: false})
    linkedin_link: string;
    
    @Column({type: "varchar", nullable: true, array: true})
    skills: string[];
    
    @Column({type: "varchar", nullable: true, array: true})
    soft_skills: string[];

}
