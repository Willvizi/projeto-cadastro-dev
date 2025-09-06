import AppDataSource from "../utils/data-source";
import { desenvolvedor } from "../entities/desenvolvedor";

export class DesenvolvedoresService {
    private desenvolvedoresRepository = AppDataSource.getRepository(desenvolvedor);

    async create(desenvolvedorData: any) {
        console.log("Criando desenvolvedor:", desenvolvedorData);
        const novoDesenvolvedor = this.desenvolvedoresRepository.create(desenvolvedorData);
        return await this.desenvolvedoresRepository.save(novoDesenvolvedor);
    }
}