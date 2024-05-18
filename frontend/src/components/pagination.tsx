import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { FC } from 'react'

import { Button } from './ui/button'

type PaginationProps = {
  pageIndex: number
  totalCount: number
  perPage: number
}

export const Pagination: FC<PaginationProps> = ({
  pageIndex,
  totalCount,
  perPage,
}) => {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total of {totalCount} item(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Page {pageIndex + 1} of {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>

          <Button variant="outline" size="icon">
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>

          <Button variant="outline" size="icon">
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>

          <Button variant="outline" size="icon">
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
