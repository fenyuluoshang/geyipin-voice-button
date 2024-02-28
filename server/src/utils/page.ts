import { PageRequestDTO } from '@/dtos'

export function getFindOptionsByPage(page: PageRequestDTO) {
  return page.pageSize === 0
    ? {}
    : {
        skip: page.pageSize * (page.page - 1),
        take: page.pageSize
      }
}
