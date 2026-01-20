import type { DC } from "@mtkruto/mtkruto";
import { dataCenterLocations } from "./data/dataCenterLocations";
import "./DataCenterSelectorItem.css";
import { DataCenterDisplayName } from "./DataCenterDisplayName";
import { selectedDataCenters, setSelectedDataCenters } from "./state/selectedDataCenters";

export function DataCenter({ id }: { id: DC }) {
  return (
    <li
      classList={{
        "data-center-selector-item": true,
        "is-selected": selectedDataCenters().has(id),
      }}
      onClick={() => {
        const set = selectedDataCenters();
        set.has(id) ? set.delete(id) : set.add(id);
        setSelectedDataCenters(new Set(set));
      }}
    >
      <div class="data-center-id">
        <DataCenterDisplayName dc={id} />
      </div>
      <div class="data-center-location">{dataCenterLocations[id]}</div>
    </li>
  );
}
