import { dataCenters } from "./data/dataCenters";
import { DataCenter } from "./DataCenterSelectorItem";
import "./DataCenterSelector.css";
import { For } from "solid-js";

export function DataCenterSelector() {
  return (
    <ul class="data-center-selector">
      <For each={dataCenters}>
        {v => <DataCenter id={v} />}
      </For>
    </ul>
  );
}
