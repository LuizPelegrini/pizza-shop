import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const OrderDetails = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Search className="size-3" />
          <span className="sr-only">Order details</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order: sdjsjdhsdhwks</DialogTitle>
          <DialogDescription>Order details</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-slate-400" />
                    <span className="font-medium text-muted-foreground">
                      Pending
                    </span>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Client</TableCell>
                <TableCell className="flex justify-end">
                  Luiz Pelegrini
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">
                  Contact number
                </TableCell>
                <TableCell className="flex justify-end">
                  +60 17 3180418
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Email</TableCell>
                <TableCell className="flex justify-end">
                  ldesouzapelegrini01@gmail.com
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-muted-foreground">Created</TableCell>
                <TableCell className="flex justify-end">15 min ago</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Qtd.</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Pizza Pepperoni</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">$22.95</TableCell>
                <TableCell className="text-right">$45.90</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pizza Margherita</TableCell>
                <TableCell className="text-right">2</TableCell>
                <TableCell className="text-right">$20.90</TableCell>
                <TableCell className="text-right">$41.80</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Order total</TableCell>
                <TableCell className="text-right font-medium">$87.70</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
