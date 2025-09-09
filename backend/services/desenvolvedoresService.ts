import AppDataSource from "../utils/data-source";
import { desenvolvedor } from "../entities/desenvolvedor";

export class DesenvolvedoresService {
    private desenvolvedoresRepository = AppDataSource.getRepository(desenvolvedor);

    async create(desenvolvedorData: any) {
        const novoDesenvolvedor = this.desenvolvedoresRepository.create(desenvolvedorData);
        const desenvolvedorSalvo = await this.desenvolvedoresRepository.save(novoDesenvolvedor)

        const id = Array.isArray(desenvolvedorSalvo) ? desenvolvedorSalvo[0].id : (desenvolvedorSalvo as desenvolvedor).id;

        return await this.desenvolvedoresRepository.findOne({
            where: { id },
            relations: ['nivel']
        });
    }

    async findAll(limit?: number, offset?: number) {
        const [desenvolvedores, total] = await this.desenvolvedoresRepository.findAndCount({
            relations: ['nivel'],
            take: limit,
            skip: offset
        });
        
        return {
            desenvolvedores,
            total
        };
    }

    async findById(id: number) {
        return await this.desenvolvedoresRepository.findOne({
            where: { id },
            relations: ['nivel']
        });
    }

    async update(id: number, desenvolvedorData: any) {
        await this.desenvolvedoresRepository.update(id, desenvolvedorData);
        return this.findById(id);
    }

    async deleteById(id: number) {
        await this.desenvolvedoresRepository.delete(id);
    }
}