import clsx from "clsx";

export type Tool = "empty" | "wire" | "gate" | "crossedWire";

function ToolbarButton({
  label,
  toolName,
  active = false,
  setActiveTool,
}: {
  label: string;
  toolName: Tool;
  active: boolean;
  setActiveTool: (activeTool: Tool) => void;
}) {
  return (
    <button
      className={clsx("px-3 py-2 text-sm rounded-md font-semibold transition", {
        ["text-white bg-blue-500"]: active,
        ["text-blue-500 hover:bg-gray-200"]: !active,
      })}
      onClick={() => setActiveTool(toolName)}
    >
      {label}
    </button>
  );
}

export default function Toolbar({
  activeTool,
  setActiveTool,
}: {
  activeTool: Tool;
  setActiveTool: (activeTool: Tool) => void;
}) {
  return (
    <div className="flex space-x-2">
      <ToolbarButton
        active={activeTool === "empty"}
        label="Empty"
        toolName="empty"
        setActiveTool={setActiveTool}
      ></ToolbarButton>
      <ToolbarButton
        active={activeTool === "wire"}
        label="Wire"
        toolName="wire"
        setActiveTool={setActiveTool}
      ></ToolbarButton>
      <ToolbarButton
        active={activeTool === "gate"}
        label="Gate"
        toolName="gate"
        setActiveTool={setActiveTool}
      ></ToolbarButton>
      <ToolbarButton
        active={activeTool === "crossedWire"}
        label="Crossed Wire"
        toolName="crossedWire"
        setActiveTool={setActiveTool}
      ></ToolbarButton>
    </div>
  );
}
