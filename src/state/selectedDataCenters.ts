import type { DC } from "@mtkruto/mtkruto";
import { createSignal } from "solid-js";

export const [selectedDataCenters, setSelectedDataCenters] = createSignal(new Set<DC>());
