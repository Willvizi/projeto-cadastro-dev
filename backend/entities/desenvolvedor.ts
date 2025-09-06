import {PrimaryGeneratedColumn, Entity, Column, ManyToMany, ManyToOne, JoinColumn} from "typeorm";
import { nivel } from "./nivel";

@Entity("desenvolvedor")
export class desenvolvedor {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => nivel, nivel => nivel.id)
    @JoinColumn({ name: "nivel_id" })
    nivel!: nivel;

    @Column({ length: 120 })
    nome!: string;

    @Column({type: 'char', length: 1})
    sexo!: string;

    @Column({ type: 'date' })
    data_nascimento!: Date;

    @Column({ length: 50, nullable: true })
    hobby!: string;
}