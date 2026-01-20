import type { DC } from "@mtkruto/mtkruto";
import { createSignal } from "solid-js";

export type ConnectivityTestState = "connecting" | 'connection-failed' | {
  type: "running";
  ping: number;
} | {
  type: "done";
  ping: number;
};

export const [connectivityTest, setConnectivityTest] = createSignal(new Map<DC, ConnectivityTestState>());
