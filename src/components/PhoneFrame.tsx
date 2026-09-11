import { useEffect, useState, type ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="stage">
      <div className="phone">
        <div className="phone-screen is-dark">{children}</div>
      </div>
    </div>
  );
}

export function StatusBar() {
  const [time, setTime] = useState("09:41");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="status-bar">
      <span>{time}</span>
      <span className="live-pill sm">
        <i /> LIVE
      </span>
    </div>
  );
}
