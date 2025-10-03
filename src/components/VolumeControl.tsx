import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Sound } from "@/types/sound";
import { Button } from "@/components/ui/button";

interface VolumeControlProps {
  sounds: Sound[];
  masterVolume: number;
  onSoundVolumeChange: (id: string, volume: number) => void;
  onMasterVolumeChange: (volume: number) => void;
}

export function VolumeControl({
  sounds,
  masterVolume,
  onSoundVolumeChange,
  onMasterVolumeChange,
}: VolumeControlProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card border-border gradient-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Master Volume</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMasterVolumeChange(masterVolume > 0 ? 0 : 100)}
              className="h-8 w-8"
            >
              {masterVolume === 0 ? (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Volume2 className="h-5 w-5 text-primary" />
              )}
            </Button>
            <span className="text-sm font-medium w-12 text-foreground">{masterVolume}%</span>
          </div>
        </div>
        <Slider
          value={[masterVolume]}
          max={100}
          step={1}
          onValueChange={([value]) => onMasterVolumeChange(value)}
          className="cursor-pointer"
        />
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Individual Sounds</h3>
        {sounds.length === 0 ? (
          <Card className="p-6 shadow-card border-border">
            <p className="text-center text-muted-foreground">No sounds loaded yet</p>
          </Card>
        ) : (
          sounds.map((sound) => (
            <Card key={sound.id} className="p-4 shadow-card border-border gradient-card">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground truncate flex-1">{sound.name}</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onSoundVolumeChange(sound.id, sound.volume > 0 ? 0 : 100)}
                    className="h-8 w-8"
                  >
                    {sound.volume === 0 ? (
                      <VolumeX className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-primary" />
                    )}
                  </Button>
                  <span className="text-sm font-medium w-12 text-foreground">{sound.volume}%</span>
                </div>
              </div>
              <Slider
                value={[sound.volume]}
                max={100}
                step={1}
                onValueChange={([value]) => onSoundVolumeChange(sound.id, value)}
                className="cursor-pointer"
              />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
