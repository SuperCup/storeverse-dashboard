import { getStore } from "../data/stores";
import { IconCamera, IconSearch } from "../icons";

export function DsrHome({
  historyIds,
  onCapture,
  onSearch,
  onOpenStore,
  onSwitchRole,
}: {
  historyIds: string[];
  onCapture: () => void;
  onSearch: () => void;
  onOpenStore: (id: string) => void;
  onSwitchRole: () => void;
}) {
  return (
    <div className="screen">
      <div className="app-header">
        <div>
          <div className="kicker">DSR · 高宇 · 海淀片区</div>
          <div className="brand" style={{ fontSize: 22, marginTop: 4 }}>
            StoreVerse
          </div>
        </div>
        <button className="chip ghost" onClick={onSwitchRole}>
          角色
        </button>
      </div>

      <div className="live-row">
        <span className="live-pill"><i /> 定位已就绪</span>
        <span className="live-pill">Connect 在线</span>
      </div>

      <button className="capture-cta" onClick={onCapture} style={{ marginTop: 16 }}>
        <div className="kicker">新接管 / 以前没管过</div>
        <div className="h2" style={{ marginTop: 8 }}>拍门头，立刻出看板</div>
        <p className="muted" style={{ color: "#b7c9dc", maxWidth: 250 }}>
          先看这家店真实卖了什么，再决定补货、加预算还是停机制。
        </p>
        <span className="shutter-hint">
          <IconCamera /> 打开识店相机
        </span>
      </button>

      <div className="home-nav">
        <button onClick={onSearch}>
          <span className="row" style={{ justifyContent: "center" }}>
            <IconSearch /> 搜索门店
          </span>
        </button>
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          历史门店
        </div>
        <span className="muted">已接管</span>
      </div>
      <div className="stack">
        {historyIds.map((id) => {
          const store = getStore(id);
          return (
            <button key={store.id} className="store-mini" onClick={() => onOpenStore(store.id)}>
          <div className="store-dot">SV</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <b>{store.name}</b>
                <div className="muted">
                  {store.city} · {store.opportunity.amount} · {store.platformsCovered[0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
