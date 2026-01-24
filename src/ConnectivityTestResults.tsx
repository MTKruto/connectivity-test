import { connectivityTest } from "./state/connectivityTest";
import "./ConnectivityTestResults.css";
import { Show } from "solid-js";
import { dataCenterLocations } from "./data/dataCenterLocations";
import { DataCenterDisplayName } from "./DataCenterDisplayName";
import { Dots } from "./Dots";
import { PingResult } from "./PingResult";

export function ConnectivityTestResults() {
  return (
    <section>
      <ul class="connectivity-test-results">
        {Array.from(connectivityTest().entries()).map(([dc, status]) => (
          <li class="connectivity-test-result">
            <div>
              <DataCenterDisplayName dc={dc} /> ({dataCenterLocations[dc]})
            </div>
            <div class="status">
              {status === "connection-failed" ? <span class="error">Connection failed</span> : status === "connecting"
                ? (
                  <>
                    <Dots />
                    <span class="dimmed">
                      Connecting
                    </span>
                  </>
                )
                : (
                  <>
                    <Show when={status.type === "running"}>
                      <Dots />
                    </Show>
                    <PingResult ping={status.ping} />
                  </>
                )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
