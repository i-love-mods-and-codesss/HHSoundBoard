import { useState, useCallback, useEffect, useRef } from "react";
import { Sound, OutputDevice } from "@/types/sound";
import { toast } from "@/hooks/use-toast";

export function useSoundboard() {
  const [sounds, setSounds] = useState<Sound[]>([]);
  const [masterVolume, setMasterVolume] = useState(100);
  const [stopAllHotkey, setStopAllHotkey] = useState("");
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map());

  const addSounds = useCallback((files: FileList) => {
    const newSounds: Sound[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      file,
      url: URL.createObjectURL(file),
      hotkey: "",
      output: "both" as OutputDevice,
      volume: 100,
      isPlaying: false,
    }));

    setSounds((prev) => [...prev, ...newSounds]);
    toast({
      title: "Sounds added",
      description: `Added ${newSounds.length} sound${newSounds.length > 1 ? "s" : ""}`,
    });
  }, []);

  const playSound = useCallback(
    (id: string) => {
      const sound = sounds.find((s) => s.id === id);
      if (!sound) return;

      let audio = audioElementsRef.current.get(id);
      if (!audio) {
        audio = new Audio(sound.url);
        audioElementsRef.current.set(id, audio);
      }

      audio.volume = (sound.volume / 100) * (masterVolume / 100);
      audio.currentTime = 0;
      audio.play();

      setSounds((prev) =>
        prev.map((s) => (s.id === id ? { ...s, isPlaying: true } : s))
      );

      audio.onended = () => {
        setSounds((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isPlaying: false } : s))
        );
      };
    },
    [sounds, masterVolume]
  );

  const stopSound = useCallback((id: string) => {
    const audio = audioElementsRef.current.get(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    setSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPlaying: false } : s))
    );
  }, []);

  const stopAllSounds = useCallback(() => {
    audioElementsRef.current.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    setSounds((prev) => prev.map((s) => ({ ...s, isPlaying: false })));
    toast({
      title: "Stopped all sounds",
    });
  }, []);

  const deleteSound = useCallback((id: string) => {
    const audio = audioElementsRef.current.get(id);
    if (audio) {
      audio.pause();
      audioElementsRef.current.delete(id);
    }

    setSounds((prev) => {
      const sound = prev.find((s) => s.id === id);
      if (sound) {
        URL.revokeObjectURL(sound.url);
      }
      return prev.filter((s) => s.id !== id);
    });
  }, []);

  const assignHotkey = useCallback((id: string, hotkey: string) => {
    setSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, hotkey } : s))
    );
  }, []);

  const setOutput = useCallback((id: string, output: OutputDevice) => {
    setSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, output } : s))
    );
  }, []);

  const cycleOutput = useCallback((id: string) => {
    setSounds((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const outputs: OutputDevice[] = ["output1", "output2", "both"];
        const currentIndex = outputs.indexOf(s.output);
        const nextOutput = outputs[(currentIndex + 1) % outputs.length];
        return { ...s, output: nextOutput };
      })
    );
  }, []);

  const updateSoundVolume = useCallback((id: string, volume: number) => {
    setSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, volume } : s))
    );

    const audio = audioElementsRef.current.get(id);
    if (audio) {
      audio.volume = (volume / 100) * (masterVolume / 100);
    }
  }, [masterVolume]);

  const updateMasterVolume = useCallback((volume: number) => {
    setMasterVolume(volume);
    audioElementsRef.current.forEach((audio, id) => {
      const sound = sounds.find((s) => s.id === id);
      if (sound) {
        audio.volume = (sound.volume / 100) * (volume / 100);
      }
    });
  }, [sounds]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toUpperCase();
      const keyString = key === " " ? "SPACE" : key;

      // Check for stop all hotkey
      if (stopAllHotkey && keyString === stopAllHotkey) {
        e.preventDefault();
        stopAllSounds();
        return;
      }

      // Check for individual sound hotkeys
      const sound = sounds.find((s) => s.hotkey === keyString);
      if (sound) {
        e.preventDefault();
        if (sound.isPlaying) {
          stopSound(sound.id);
        } else {
          playSound(sound.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [sounds, stopAllHotkey, playSound, stopSound, stopAllSounds]);

  useEffect(() => {
    return () => {
      sounds.forEach((sound) => URL.revokeObjectURL(sound.url));
      audioElementsRef.current.forEach((audio) => audio.pause());
    };
  }, []);

  return {
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
  };
}
