module Pagination
  def pagination(records)
    {
      pagination: {
        current_page: records.current_page,
        total_count: records.total_count,
        total_pages: records.total_pages,
      }
    }
  end
end
