"use client";
import CircuitView from "@/components/CircuitView";
import Toolbar, { Tool } from "@/components/Toolbar";
import { useState } from "react";

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>("wire");

  return (
    <main className="min-h-full flex flex-col justify-center items-center space-y-2">
      <Toolbar activeTool={activeTool} setActiveTool={setActiveTool} />
      <CircuitView activeTool={activeTool}></CircuitView>
    </main>
  );
}
