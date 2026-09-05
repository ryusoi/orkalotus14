import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

export interface AuthDialogProps {
  title?: string;
  description?: string;
  buttonLabel?: string;
  logo?: string;
  open?: boolean;
  onLogin: () => void;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

export function AuthDialog({
  title = "Authentication Required",
  description = "Please sign in to continue",
  buttonLabel = "Sign In",
  logo,
  open = false,
  onLogin,
  onOpenChange,
  onClose,
}: AuthDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    if (!onOpenChange) {
      setInternalOpen(open);
    }
  }, [open, onOpenChange]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalOpen(nextOpen);
    }

    if (!nextOpen) {
      onClose?.();
    }
  };

  return (
    <Dialog
      open={onOpenChange ? open : internalOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogContent className="py-5 bg-card text-card-foreground rounded-[20px] w-[400px] shadow-lg border border-border p-0 gap-0 text-center">
        <div className="flex flex-col items-center gap-2 p-5 pt-10">
          {logo ? (
            <div className="w-16 h-16 bg-muted rounded-xl border border-border flex items-center justify-center">
              <img
                src={logo}
                alt="Auth icon"
                className="w-10 h-10 rounded-md object-contain"
              />
            </div>
          ) : null}

          {title ? (
            <DialogTitle className="text-xl font-serif font-semibold leading-[26px]">
              {title}
            </DialogTitle>
          ) : null}
          <DialogDescription className="text-sm text-muted-foreground leading-5">
            {description}
          </DialogDescription>
        </div>

        <DialogFooter className="px-5 py-5">
          <Button
            onClick={onLogin}
            className="w-full h-10 bg-primary hover:opacity-90 text-primary-foreground rounded-xl text-sm font-medium leading-5"
          >
            {buttonLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Backwards compatibility alias
export const ManusDialog = AuthDialog;
