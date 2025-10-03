export type OutputDevice = "output1" | "output2" | "both";

export interface Sound {
  id: string;
  name: string;
  file: File;
  url: string;
  hotkey: string;
  output: OutputDevice;
  volume: number;
  isPlaying: boolean;
}
