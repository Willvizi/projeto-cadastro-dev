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

    async findAll() {
        return await this.desenvolvedoresRepository.find({ relations: ['nivel'] });
    }

    async findById(id: number) {
        return await this.desenvolvedoresRepository.findOne({
            where: { id },
            relations: ['nivel']
        });
    }
}