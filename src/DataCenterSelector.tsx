import { dataCenters } from "./data/dataCenters";
import { DataCenter } from "./DataCenterSelectorItem";
import "./DataCenterSelector.css";

export function DataCenterSelector() {
  return (
    <ul class="data-center-selector">
      {dataCenters.map(v => <DataCenter id={v} />)}
    </ul>
  );
}
