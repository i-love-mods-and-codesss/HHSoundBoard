import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Sound, OutputDevice } from "@/types/sound";
import { Headphones, Speaker } from "lucide-react";

interface OutputSettingsProps {
  sounds: Sound[];
  onOutputChange: (id: string, output: OutputDevice) => void;
}

export function OutputSettings({ sounds, onOutputChange }: OutputSettingsProps) {
  const getOutputBadge = (output: OutputDevice) => {
    const configs = {
      output1: { 
        color: "bg-primary/20 text-primary-glow border-primary/30",
        label: "Output 1",
        icon: Speaker
      },
      output2: { 
        color: "bg-accent/20 text-accent-foreground border-accent/30",
        label: "Output 2",
        icon: Headphones
      },
      both: { 
        color: "bg-success/20 text-success border-success/30",
        label: "Both Outputs",
        icon: Speaker
      },
    };
    const config = configs[output];
    const Icon = config.icon;
    
    return (
      <Badge variant="outline" className={`${config.color} transition-smooth`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card border-border gradient-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Audio Output Configuration</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <Speaker className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-medium text-foreground">Output 1</h4>
              <p className="text-sm text-muted-foreground">Primary audio device (e.g., Speakers)</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
            <Headphones className="h-8 w-8 text-accent" />
            <div>
              <h4 className="font-medium text-foreground">Output 2</h4>
              <p className="text-sm text-muted-foreground">Secondary audio device (e.g., Virtual Cable)</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Sound Output Routing</h3>
        {sounds.length === 0 ? (
          <Card className="p-6 shadow-card border-border">
            <p className="text-center text-muted-foreground">No sounds loaded yet. Add sounds to configure their output routing.</p>
          </Card>
        ) : (
          sounds.map((sound) => (
            <Card key={sound.id} className="p-4 shadow-card border-border gradient-card">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">{sound.name}</h4>
                  <div className="flex items-center gap-2">
                    {getOutputBadge(sound.output)}
                  </div>
                </div>
                <Select
                  value={sound.output}
                  onValueChange={(value: OutputDevice) => onOutputChange(sound.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="output1">
                      <div className="flex items-center gap-2">
                        <Speaker className="h-4 w-4" />
                        Output 1
                      </div>
                    </SelectItem>
                    <SelectItem value="output2">
                      <div className="flex items-center gap-2">
                        <Headphones className="h-4 w-4" />
                        Output 2
                      </div>
                    </SelectItem>
                    <SelectItem value="both">
                      <div className="flex items-center gap-2">
                        <Speaker className="h-4 w-4" />
                        Both Outputs
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
