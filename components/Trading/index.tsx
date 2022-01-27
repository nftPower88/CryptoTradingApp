import useInterval from "../../lib/useInterval";
import Counter from "../counter";
import Nav from "../Navbar";
import { useStore } from "../../lib/store";

export default function TradingPage() {
  const { tick } = useStore();

  // Tick the time every second
  useInterval(() => {
    tick(Date.now(), true);
  }, 1000);

  return (
    <div style={{padding: '0 10%'}}>
      <Nav />
      <Counter />
    </div>
  );
}
