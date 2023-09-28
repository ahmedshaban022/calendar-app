"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type dialogProps = {
  children: React.ReactNode;
  title: string;
  triggerString: string;
};
const CustomDialog = ({ children, title, triggerString }: dialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>{triggerString}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
