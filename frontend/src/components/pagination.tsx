import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { FC, MouseEventHandler } from 'react'

import { Button } from './ui/button'
import { useSearchParams } from 'react-router-dom'

type PaginationProps = {
  totalCount: number
  perPage: number
}

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  perPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1');

  const lastPage = Math.ceil(totalCount / perPage) || 1

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === lastPage;

  const handlePageChange = (page: number) => {
    setSearchParams(state => {
      state.set('page', String(page))
      return state;
    })
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Page {currentPage} of {lastPage}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={isFirstPage}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={isFirstPage}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={isLastPage}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(lastPage)}
            disabled={isLastPage}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
