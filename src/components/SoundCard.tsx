import { Play, Pause, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sound } from "@/types/sound";

interface SoundCardProps {
  sound: Sound;
  onPlay: (id: string) => void;
  onStop: (id: string) => void;
  onDelete: (id: string) => void;
  onAssignHotkey: (id: string) => void;
  onOutputChange: (id: string) => void;
}

export function SoundCard({
  sound,
  onPlay,
  onStop,
  onDelete,
  onAssignHotkey,
  onOutputChange,
}: SoundCardProps) {
  const getOutputBadge = () => {
    const colors = {
      output1: "bg-primary/20 text-primary-glow border-primary/30",
      output2: "bg-accent/20 text-accent-foreground border-accent/30",
      both: "bg-success/20 text-success border-success/30",
    };
    const labels = {
      output1: "Output 1",
      output2: "Output 2",
      both: "Both",
    };
    return (
      <Badge variant="outline" className={`${colors[sound.output]} transition-smooth`}>
        {labels[sound.output]}
      </Badge>
    );
  };

  return (
    <Card className="shadow-card hover:shadow-glow transition-smooth border-border p-4 gradient-card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground truncate flex-1">{sound.name}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(sound.id)}
          className="h-8 w-8 text-destructive hover:text-destructive-foreground hover:bg-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2 mb-3">
        <Button
          onClick={() => (sound.isPlaying ? onStop(sound.id) : onPlay(sound.id))}
          className={sound.isPlaying ? "bg-success hover:bg-success/90" : ""}
        >
          {sound.isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Playing
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Play
            </>
          )}
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Hotkey:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAssignHotkey(sound.id)}
            className="h-7 text-xs"
          >
            {sound.hotkey || "Not set"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Output:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOutputChange(sound.id)}
            className="h-7 p-0"
          >
            {getOutputBadge()}
          </Button>
        </div>
      </div>
    </Card>
  );
}
