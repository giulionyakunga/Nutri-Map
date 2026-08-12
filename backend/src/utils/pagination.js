function getPagination(query) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(query.limit, 10) || 25, 1), 200);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
}

function buildPaginatedResponse(rows, count, page, limit) {
  return {
    data: rows,
    pagination: {
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit)
    }
  };
}

module.exports = { getPagination, buildPaginatedResponse };
