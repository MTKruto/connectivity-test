import { dataCenters } from "./data/dataCenters";
import { DataCenterSelector } from "./DataCenterSelector";
import { startTest } from "./startTest";
import { selectedDataCenters, setSelectedDataCenters } from "./state/selectedDataCenters";

export function Form() {
  return (
    <section>
      <DataCenterSelector />
      <p class="note">
        Select one or more data centers and click the button below to start a connectivity test.
      </p>
      <button
        disabled={!selectedDataCenters().size}
        onClick={() => {
          startTest();
        }}
      >
        Test Connectivity
      </button>
      <p class="or-container">
        <span class="or">OR</span>
      </p>
      <button
        class="primary"
        onClick={() => {
          const set = selectedDataCenters();
          for (const dataCenter of dataCenters) {
            set.add(dataCenter);
          }
          setSelectedDataCenters(new Set(set));
          startTest();
        }}
      >
        Test All
      </button>
    </section>
  );
}
