export function obtemParametorsDePaginacao(req: any) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    
    return { page, limit, offset };
}

export function criaRespostaPaginada(data: any[], total: number, page: number, limit: number) {
    return {
        data,
        meta: {
            total,
            per_page: limit,
            current_page: page,
            last_page: Math.ceil(total / limit)
        }
    };
}