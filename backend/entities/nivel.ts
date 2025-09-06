import {PrimaryGeneratedColumn, Entity, Column} from "typeorm";

@Entity("niveis")
export class Nivel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nivel!: string;
}