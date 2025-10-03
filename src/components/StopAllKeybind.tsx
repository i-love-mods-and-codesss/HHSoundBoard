import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Keyboard } from "lucide-react";

interface StopAllKeybindProps {
  stopAllHotkey: string;
  onAssignHotkey: () => void;
}

export function StopAllKeybind({ stopAllHotkey, onAssignHotkey }: StopAllKeybindProps) {
  return (
    <Card className="p-4 shadow-card border-border gradient-card mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Keyboard className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Stop All Sounds Hotkey</h3>
            <p className="text-sm text-muted-foreground">Press this key to stop all playing sounds</p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={onAssignHotkey}
          className="min-w-[120px]"
        >
          {stopAllHotkey ? (
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
              {stopAllHotkey}
            </Badge>
          ) : (
            "Set Hotkey"
          )}
        </Button>
      </div>
    </Card>
  );
}
