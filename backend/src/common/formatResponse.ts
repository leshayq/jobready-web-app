import { PaginationResult, ToPageResults } from './interfaces/paged-results';

// Функция-форматтер, для преобразования полученных данных в данные с пагинацией
export function formatResponse(result: ToPageResults): PaginationResult {
  return {
    items: result.items,
    pagination: {
      total: result.total,
      page: result.page,
      limit: result.limit,
    },
  };
}
