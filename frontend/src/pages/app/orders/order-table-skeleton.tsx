import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import { FC } from "react"

type OrderTableSkeletonProps = {
  size?: number;
}
export const OrderTableSkeleton: FC<OrderTableSkeletonProps> = ({ size = 10}) => {
  return Array.from({ length: size }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <Skeleton className="w-8 h-8"/>
      </TableCell>
      <TableCell>
        <Skeleton className="w-[172px] h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[148px] h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[110px] h-4" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="w-[200px] h-4" />
      </TableCell>
      <TableCell className="font-medium">
        <Skeleton className="w-[64px] h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[92px] h-4" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-[92px] h-4" />
      </TableCell>
    </TableRow>
  ))
}