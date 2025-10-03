import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HotkeyDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (hotkey: string) => void;
  currentHotkey: string;
  soundName: string;
}

export function HotkeyDialog({
  open,
  onClose,
  onSave,
  currentHotkey,
  soundName,
}: HotkeyDialogProps) {
  const [capturedKey, setCapturedKey] = useState<string>("");

  useEffect(() => {
    if (open) {
      setCapturedKey("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      const key = e.key.toUpperCase();
      
      // Format special keys
      let keyString = key;
      if (key === " ") keyString = "SPACE";
      if (key.length === 1) keyString = key;
      
      setCapturedKey(keyString);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleSave = () => {
    if (capturedKey) {
      onSave(capturedKey);
      onClose();
    }
  };

  const handleClear = () => {
    onSave("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Hotkey</DialogTitle>
          <DialogDescription>Press any key to assign it to "{soundName}"</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-6">
          <div className="w-full h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/50">
            {capturedKey ? (
              <Badge className="text-2xl px-6 py-3 bg-primary text-primary-foreground">
                {capturedKey}
              </Badge>
            ) : (
              <p className="text-muted-foreground">Press a key...</p>
            )}
          </div>

          {currentHotkey && (
            <p className="text-sm text-muted-foreground">
              Current: <Badge variant="outline">{currentHotkey}</Badge>
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleClear} className="flex-1">
            Clear
          </Button>
          <Button onClick={handleSave} disabled={!capturedKey} className="flex-1">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
