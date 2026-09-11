import { useEffect, useState } from "react";
import { IconBack } from "../icons";

const STEPS = ["门头特征锁定", "匹配 StoreVerse 归一门店", "装载近 30 天经营事实"];

export function CameraCapture({
  onBack,
  onRecognized,
}: {
  onBack: () => void;
  onRecognized: () => void;
}) {
  const [scanning, setScanning] = useState(false);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!scanning) return;
    setStep(0);
    const t1 = window.setTimeout(() => setStep(1), 700);
    const t2 = window.setTimeout(() => setStep(2), 1400);
    const t3 = window.setTimeout(onRecognized, 2400);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [scanning, onRecognized]);

  return (
    <div className="camera">
      <div className="cam-top row space">
        <button className="icon-btn" onClick={onBack} aria-label="返回">
          <IconBack />
        </button>
        <div className="kicker">VISION LOCK</div>
        <div style={{ width: 36 }} />
      </div>
      <div className="viewfinder radar">
        <div className="storefront">
          <div className="sign">永辉超市</div>
          <div className="doors" />
        </div>
        <div className="view-mask" />
        <div className="corners">
          <i className="tl" />
          <i className="tr" />
          <i className="bl" />
          <i className="br" />
        </div>
        <div className="hud-chip" style={{ top: 16, left: 14 }}>
          23.133°N 113.327°E
        </div>
        <div className="hud-chip" style={{ top: 16, right: 14 }}>
          ±8m
        </div>
        <div className="hud-chip" style={{ bottom: 16, left: 14 }}>
          天娱广场 门头
        </div>
        {scanning && <div className="scan-beam" />}
        {scanning && (
          <div className="overlay">
            <div className="kicker">IDENTIFYING</div>
            <div className="h2" style={{ marginTop: 6 }}>
              正在连接这家店的经营事实
            </div>
            <ol>
              {STEPS.map((label, index) => (
                <li key={label} className={index <= step ? "on" : ""}>
                  <span className="step-dot">{index + 1}</span>
                  {label}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div className="cam-bottom">
        <button className="cam-side muted" onClick={onBack} disabled={scanning}>
          取消
        </button>
        <button className="shutter" onClick={() => setScanning(true)} aria-label="拍照" disabled={scanning}>
          <span />
        </button>
        <div className="cam-side right" style={{ color: "#9af4ff" }}>
          {scanning ? "识别中" : "识店"}
        </div>
      </div>
    </div>
  );
}
