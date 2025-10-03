import { Upload, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

interface SoundboardHeaderProps {
  onFilesSelected: (files: FileList) => void;
  onStopAll: () => void;
  hasPlayingSounds: boolean;
}

export function SoundboardHeader({
  onFilesSelected,
  onStopAll,
  hasPlayingSounds,
}: SoundboardHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className="border-b border-border bg-card shadow-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              HHSoundBoard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Professional audio routing & hotkey control
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="transition-smooth"
            >
              <Upload className="h-4 w-4 mr-2" />
              Add Sounds
            </Button>
            <Button
              variant="destructive"
              onClick={onStopAll}
              disabled={!hasPlayingSounds}
              className="transition-smooth"
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop All
            </Button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".mp3,.wav,.ogg"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onFilesSelected(e.target.files);
            e.target.value = "";
          }
        }}
      />
    </header>
  );
}
