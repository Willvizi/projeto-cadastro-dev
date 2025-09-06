import AppDataSource from "../utils/data-source";
import { nivel } from "../entities/nivel";

export class NiveisService {
    private niveisRepository = AppDataSource.getRepository(nivel);

    async create(nivelData: any) {
        const novoNivel = this.niveisRepository.create(nivelData);
        const nivelSalvo = await this.niveisRepository.save(novoNivel);

        const id = Array.isArray(nivelSalvo) ? nivelSalvo[0].id : (nivelSalvo as nivel).id;

        return await this.niveisRepository.findOne({
            where: { id },
        });
    }

    async findAll(limit?: number, offset?: number) {
    const whereClause = {};
    
    const [niveis, total] = await Promise.all([
        this.niveisRepository.find({
            take: limit,
            skip: offset,
        }),
        this.niveisRepository.count(whereClause)
    ]);

    return {
        niveis,
        total
    };
}

    async findById(id: number) {
        return await this.niveisRepository.findOne({
            where: { id }
        });
    }

    async update(id: number, nivelData: any) {
        await this.niveisRepository.update(id, nivelData);
        return this.findById(id);
    }

    async deleteById(id: number) {
        await this.niveisRepository.delete(id);
    }
}