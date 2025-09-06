import {PrimaryGeneratedColumn, Entity, Column} from "typeorm";

@Entity("niveis")
export class nivel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nivel!: string;
}