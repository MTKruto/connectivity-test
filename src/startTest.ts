import { ClientDispatcher, ClientWorker, type DC, getRandomId } from "@mtkruto/mtkruto";
import { connectivityTest, setConnectivityTest } from "./state/connectivityTest";
import { selectedDataCenters } from "./state/selectedDataCenters";

export async function startTest() {
  const clientWorker = new ClientWorker("/mtkruto-worker.js", { type: "module" });
  const dataCenters = Array.from(selectedDataCenters().values())
    .sort((a, b) => a.localeCompare(b));

  const clients = new Map<DC, ClientDispatcher>();

  const promises = new Array<Promise<void>>();
  for (const dataCenter of dataCenters) {
    promises.push(
      Promise.resolve().then(async () => {
        const map = connectivityTest();
        map.set(dataCenter, "connecting");
        setConnectivityTest(new Map(map));
        console.log("set connectivity test to", map);
        const client = await clientWorker.createClient({
          initialDc: dataCenter,
        });
        await client.connect();
        clients.set(dataCenter, client);
      }).catch(() => {
        const map = connectivityTest();
        map.set(dataCenter, "connection-failed");
        setConnectivityTest(new Map(map));
      }),
    );
  }

  await Promise.allSettled(promises);

  for (const [dataCenter, client] of clients.entries()) {
    Promise.resolve().then(async () => {
      let delay = 0;
      const rounds = 10;
      for (let i = 0; i < rounds; ++i) {
        const then = Date.now();
        await client.invoke({ _: "ping", ping_id: getRandomId() });
        delay += Date.now() - then;

        const map = connectivityTest();
        map.set(dataCenter, {
          type: i === (rounds - 1)
            ? "done"
            : "running",
          ping: Math.round(delay / (i + 1)),
        });
        setConnectivityTest(new Map(map));

        await new Promise(r => setTimeout(r, 500));
      }
    }).catch(() => {
      const map = connectivityTest();
      map.set(dataCenter, "connection-failed");
      setConnectivityTest(new Map(map));
    });
  }
}
