import AppDataSource from "../utils/data-source";

export class DesenvolvedoresService {
    private desenvolvedoresRepository = AppDataSource.getRepository("desenvolvedor");

    async create(desenvolvedorData: any) {
        const novoDesenvolvedor = this.desenvolvedoresRepository.create(desenvolvedorData);
        return await this.desenvolvedoresRepository.save(novoDesenvolvedor);
    }
}