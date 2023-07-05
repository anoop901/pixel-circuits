import generate from "@anoop901/js-util/iterables/generate";
import repeat from "@anoop901/js-util/iterables/repeat";
import toArray from "@anoop901/js-util/iterables/toArray";
import { Circuit } from "./Circuit";

export default function makeEmptyCircuit(
  width: number,
  height: number
): Circuit {
  return {
    width,
    height,
    grid: toArray(generate(() => toArray(repeat("empty", width)), height)),
  };
}
