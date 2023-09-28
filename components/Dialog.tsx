"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
type dialogProps = {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  title: string;
  triggerString: string;
};
const CustomDialog = ({
  children,
  title,
  triggerString,
  open,
  setOpen,
}: dialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (setOpen !== undefined) {
          setOpen(false);
        }
      }}
    >
      <DialogTrigger>{triggerString}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default CustomDialog;
