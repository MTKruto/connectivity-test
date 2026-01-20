import './PingResult.css';

export function PingResult({ ping }: { ping: number }) {
  return <span classList={{
    'ping-result-green': ping < 150,
    'ping-result-yellow': ping >= 150 && ping <= 200,
    'ping-result-red': ping > 200,
  }}>{ping}ms</span>;
}
