export type CircuitPixel = "empty" | "wire" | "crossedWire" | "gate";
export interface Circuit {
  width: number;
  height: number;
  grid: CircuitPixel[][];
}
