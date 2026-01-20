import type { DC } from "@mtkruto/mtkruto";

export function DataCenterDisplayName({ dc }: { dc: DC }) {
  return <>DC{dc.replace("-test", " (Test)")}</>;
}
