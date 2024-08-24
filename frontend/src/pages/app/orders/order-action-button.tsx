import { ComponentPropsWithoutRef, FC } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const OrderActionButton: FC<ComponentPropsWithoutRef<typeof Button>> = ({ children, ...props }) => {
  return (
    <Button variant="outline" size="xs" {...props}>
      <ArrowRight className="mr-2 size-3" />
      {children}
    </Button>
  )
}