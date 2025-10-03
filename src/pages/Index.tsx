import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SoundboardHeader } from "@/components/SoundboardHeader";
import { SoundCard } from "@/components/SoundCard";
import { VolumeControl } from "@/components/VolumeControl";
import { OutputSettings } from "@/components/OutputSettings";
import { StopAllKeybind } from "@/components/StopAllKeybind";
import { HotkeyDialog } from "@/components/HotkeyDialog";
import { useSoundboard } from "@/hooks/useSoundboard";
import { Card } from "@/components/ui/card";
import { Music } from "lucide-react";
import { OutputDevice } from "@/types/sound";

const Index = () => {
  const {
    sounds,
    masterVolume,
    stopAllHotkey,
    addSounds,
    playSound,
    stopSound,
    stopAllSounds,
    deleteSound,
    assignHotkey,
    setStopAllHotkey,
    cycleOutput,
    setOutput,
    updateSoundVolume,
    updateMasterVolume,
  } = useSoundboard();

  const [hotkeyDialogOpen, setHotkeyDialogOpen] = useState(false);
  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(null);
  const [isStopAllDialog, setIsStopAllDialog] = useState(false);

  const selectedSound = sounds.find((s) => s.id === selectedSoundId);
  const hasPlayingSounds = sounds.some((s) => s.isPlaying);

  const handleAssignHotkey = (id: string) => {
    setSelectedSoundId(id);
    setIsStopAllDialog(false);
    setHotkeyDialogOpen(true);
  };

  const handleAssignStopAllHotkey = () => {
    setSelectedSoundId(null);
    setIsStopAllDialog(true);
    setHotkeyDialogOpen(true);
  };

  const handleSaveHotkey = (hotkey: string) => {
    if (isStopAllDialog) {
      setStopAllHotkey(hotkey);
    } else if (selectedSoundId) {
      assignHotkey(selectedSoundId, hotkey);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SoundboardHeader
        onFilesSelected={addSounds}
        onStopAll={stopAllSounds}
        hasPlayingSounds={hasPlayingSounds}
      />

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="sounds" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="sounds">Soundboard</TabsTrigger>
            <TabsTrigger value="outputs">Output Routing</TabsTrigger>
            <TabsTrigger value="volume">Volume Control</TabsTrigger>
          </TabsList>

          <TabsContent value="sounds" className="space-y-6">
            <StopAllKeybind 
              stopAllHotkey={stopAllHotkey}
              onAssignHotkey={handleAssignStopAllHotkey}
            />
            
            {sounds.length === 0 ? (
              <Card className="p-12 text-center shadow-card">
                <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  No sounds loaded yet
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Click "Add Sounds" to upload audio files (.mp3, .wav, .ogg) and start building
                  your soundboard
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sounds.map((sound) => (
                  <SoundCard
                    key={sound.id}
                    sound={sound}
                    onPlay={playSound}
                    onStop={stopSound}
                    onDelete={deleteSound}
                    onAssignHotkey={handleAssignHotkey}
                    onOutputChange={cycleOutput}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="outputs">
            <OutputSettings
              sounds={sounds}
              onOutputChange={setOutput}
            />
          </TabsContent>

          <TabsContent value="volume">
            <VolumeControl
              sounds={sounds}
              masterVolume={masterVolume}
              onSoundVolumeChange={updateSoundVolume}
              onMasterVolumeChange={updateMasterVolume}
            />
          </TabsContent>
        </Tabs>
      </main>

      {(selectedSound || isStopAllDialog) && (
        <HotkeyDialog
          open={hotkeyDialogOpen}
          onClose={() => setHotkeyDialogOpen(false)}
          onSave={handleSaveHotkey}
          currentHotkey={isStopAllDialog ? stopAllHotkey : (selectedSound?.hotkey || "")}
          soundName={isStopAllDialog ? "Stop All Sounds" : (selectedSound?.name || "")}
        />
      )}
    </div>
  );
};

export default Index;
