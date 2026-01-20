import { Show } from "solid-js";
import "./App.css";
import { ConnectivityTestResults } from "./ConnectivityTestResults";
import { Form } from "./Form";
import { connectivityTest } from "./state/connectivityTest";

export function App() {
  return (
    <>
      <header>
        <section>
          <b>MTKruto</b> <span>Connectivity Test</span>
        </section>
      </header>
      <main>
        <Show when={!connectivityTest().size}>
          <Form />
        </Show>
        <Show when={connectivityTest().size}>
          <ConnectivityTestResults />
        </Show>
      </main>
    </>
  );
}
