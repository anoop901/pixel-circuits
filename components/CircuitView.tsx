import { MouseEvent, useEffect, useRef, useState } from "react";
import { Tool } from "./Toolbar";
import { Circuit, CircuitPixel } from "../simulation/Circuit";
import makeEmptyCircuit from "@/simulation/makeEmptyCircuit";
import { produce } from "immer";

const gridlineColor = "#666";

function circuitElementToColor(circuitPixel: CircuitPixel): string {
  switch (circuitPixel) {
    case "empty":
      return "#333";
    case "gate":
      return "#3c3";
    case "wire":
      return "#c3c";
    case "crossedWire":
      return "#939";
  }
}

export default function CircuitView({ activeTool }: { activeTool: Tool }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const gridCellSize = 20;

  const [circuit, setCircuit] = useState<Circuit>(makeEmptyCircuit(25, 25));

  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext("2d");
      if (context != null) {
        context.resetTransform();

        for (let gridX = 0; gridX < circuit.width; gridX++) {
          for (let gridY = 0; gridY < circuit.height; gridY++) {
            context.fillStyle = circuitElementToColor(
              circuit.grid[gridY][gridX]
            );
            context.fillRect(
              gridX * gridCellSize,
              gridY * gridCellSize,
              gridCellSize,
              gridCellSize
            );
          }
        }

        context.strokeStyle = gridlineColor;
        context.lineWidth = 1;
        context.beginPath();
        for (let gridX = 0; gridX <= circuit.width; gridX++) {
          context.moveTo(gridX * gridCellSize, 0);
          context.lineTo(gridX * gridCellSize, circuit.height * gridCellSize);
        }
        for (let gridY = 0; gridY <= circuit.height; gridY++) {
          context.moveTo(0, gridY * gridCellSize);
          context.lineTo(circuit.width * gridCellSize, gridY * gridCellSize);
        }
        context.stroke();
      }
    }
  }, [circuit]);

  const useToolOnGridSquare = (x: number, y: number) => {
    const gridX = Math.floor(x / gridCellSize);
    const gridY = Math.floor(y / gridCellSize);
    setCircuit(
      produce((circuit) => {
        circuit.grid[gridY][gridX] = activeTool;
      })
    );
  };

  const mouseEventToCanvasCoords = (
    e: MouseEvent<HTMLCanvasElement>
  ): { x: number; y: number } => {
    const canvas = e.currentTarget;
    const context = canvas.getContext("2d");
    if (context != null) {
      const transform = context.getTransform();
      const clientCoords = {
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top,
      };
      return transform.inverse().transformPoint(clientCoords);
    }
    return { x: 0, y: 0 };
  };

  const onCanvasMouseDownOrDrag = (e: MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = mouseEventToCanvasCoords(e);
    const canvas = e.currentTarget;
    const context = canvas.getContext("2d");
    if (context != null) {
      useToolOnGridSquare(x, y);
    }
  };

  const onCanvasMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    setDragging(true);
    onCanvasMouseDownOrDrag(e);
  };

  const onCanvasMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (dragging) {
      onCanvasMouseDownOrDrag(e);
    }
  };

  return (
    <canvas
      className=""
      ref={canvasRef}
      width={circuit.width * gridCellSize}
      height={circuit.height * gridCellSize}
      onMouseDown={onCanvasMouseDown}
      onMouseMove={onCanvasMouseMove}
      onMouseLeave={() => setDragging(false)}
      onMouseUp={() => setDragging(false)}
    ></canvas>
  );
}
