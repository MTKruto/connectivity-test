import { connectivityTest, type ConnectivityTestState } from "./state/connectivityTest";
import "./ConnectivityTestResults.css";
import type { DC } from "@mtkruto/mtkruto";
import { createEffect, createSignal, For, Show } from "solid-js";
import { dataCenterLocations } from "./data/dataCenterLocations";
import { DataCenterDisplayName } from "./DataCenterDisplayName";
import { Dots } from "./Dots";
import { PingResult } from "./PingResult";

export function ConnectivityTestResults() {
  const [connectivityTestResults, setConnectivityTestResults] = createSignal(new Array<[DC, ConnectivityTestState]>());

  createEffect(() => {
    setConnectivityTestResults(Array.from(connectivityTest().entries()));
  });

  return (
    <section>
      <ul class="connectivity-test-results">
        <For each={connectivityTestResults()}>
          {([dc, status]) => (
            <li class="connectivity-test-result">
              <div>
                <DataCenterDisplayName dc={dc} /> ({dataCenterLocations[dc]})
              </div>
              <div class="status">
                <Show
                  keyed={true}
                  when={status === "connecting" || (status !== "connection-failed" && status.type === "running")}
                >
                  <Dots />
                </Show>
                {status === "connection-failed" ? <span class="error">Connection failed</span> : status === "connecting"
                  ? (
                    <>
                      <span class="dimmed">
                        Connecting
                      </span>
                    </>
                  )
                  : (
                    <>
                      <PingResult ping={status.ping} />
                    </>
                  )}
              </div>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
