import { CHANNELS, CHANNEL_SUMMARY, VISIT_RECORDS } from "../data/account";
import { getStore } from "../data/stores";
import { IconBack } from "../icons";
import type { Channel } from "../types";

export function StatsDetail({
  channel,
  onChannel,
  onBack,
  onOpenStore,
}: {
  channel: Channel;
  onChannel: (next: Channel) => void;
  onBack: () => void;
  onOpenStore: (storeId: string) => void;
}) {
  const summary = CHANNEL_SUMMARY[channel];
  const records = VISIT_RECORDS[channel];

  return (
    <div className="screen">
      <div className="app-header">
        <button className="chip ghost" onClick={onBack}>
          <span className="row">
            <IconBack /> 首页
          </span>
        </button>
        <span className="chip">昨日明细</span>
      </div>

      <div className="tabs">
        {CHANNELS.map((item) => (
          <button
            key={item.id}
            className={`tab${channel === item.id ? " on" : ""}`}
            onClick={() => onChannel(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="metrics">
        <div className="metric">
          <div className="muted">昨日访店数</div>
          <b>{summary.visits}</b>
        </div>
        <div className="metric">
          <div className="muted">活动 GMV</div>
          <b>{summary.gmv}</b>
        </div>
        <div className="metric">
          <div className="muted">补贴金额</div>
          <b>{summary.subsidy}</b>
        </div>
        <div className="metric">
          <div className="muted">ROI</div>
          <b>{summary.roi}</b>
        </div>
      </div>
      {summary.emptyNote && <div className="empty-note">{summary.emptyNote}</div>}

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          访店明细
        </div>
        <span className="muted">点门店进看板</span>
      </div>
      <div className="stack">
        {records.map((record) => {
          const store = getStore(record.storeId);
          return (
            <button key={record.storeId} className="card detail-row" onClick={() => onOpenStore(record.storeId)}>
              <div className="row space">
                <b>{store.name}</b>
                <span className="tag">{record.time}</span>
              </div>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                {store.city}
                {store.district} · {record.action}
              </div>
              <div className="kv-row">
                <div className="kv">
                  <div className="k">活动 GMV</div>
                  <span className="v">{record.gmv}</span>
                </div>
                <div className="kv">
                  <div className="k">补贴</div>
                  <span className="v">{record.subsidy}</span>
                </div>
                <div className="kv">
                  <div className="k">ROI</div>
                  <span className="v">{record.roi}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="connect">
        访店记录来自当前账号会话，销售与补贴口径为 StoreVerse 归一门店近 30 天实数按昨日折算。
      </div>
    </div>
  );
}
