import { PagedResults } from './dto/paged-results.dto';

export function formatResponse(result: PagedResults) {
  return {
    items: result.items,
    pagination: {
      total: result.total,
      page: result.page,
      limit: result.limit,
    },
  };
}
