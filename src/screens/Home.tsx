import { ACCOUNT, CHANNELS, CHANNEL_SUMMARY } from "../data/account";
import { IconArrow } from "../icons";
import type { Channel, Role } from "../types";

export function Home({
  channel,
  onChannel,
  onPick,
  onOpenDetail,
  onLogout,
}: {
  channel: Channel;
  onChannel: (next: Channel) => void;
  onPick: (role: Role) => void;
  onOpenDetail: () => void;
  onLogout: () => void;
}) {
  const summary = CHANNEL_SUMMARY[channel];

  return (
    <div className="screen">
      <div className="app-header">
        <div style={{ minWidth: 0 }}>
          <div className="kicker">STOREVERSE OPS AI</div>
          <div className="h2" style={{ fontSize: 18, marginTop: 4 }}>
            {ACCOUNT.name} · {ACCOUNT.role}
          </div>
          <div className="muted" style={{ fontSize: 12 }}>
            {ACCOUNT.region} · 数据日期 {ACCOUNT.dataDate}
          </div>
        </div>
        <button className="chip ghost" onClick={onLogout}>
          退出
        </button>
      </div>

      <div className="card stat-card">
        <div className="row space" style={{ marginBottom: 10 }}>
          <div className="h2" style={{ fontSize: 16 }}>
            我的访店与销售
          </div>
          <span className="muted" style={{ fontSize: 12 }}>
            昨日
          </span>
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
        <button className="stat-grid" onClick={onOpenDetail}>
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
        </button>
        {summary.emptyNote && <div className="empty-note">{summary.emptyNote}</div>}
        <button className="link-row" onClick={onOpenDetail}>
          查看明细 <IconArrow />
        </button>
      </div>

      <div className="role-cards">
        <button className="role-card" onClick={() => onPick("dsr")}>
          <div className="eyebrow">一线入口</div>
          <strong>DSR 拍店</strong>
          <p className="muted">识别门店，打开销售看板，生成可追回的运营建议。</p>
          <span className="go">
            开始识店 <IconArrow />
          </span>
        </button>
        <button className="role-card" onClick={() => onPick("hq")}>
          <div className="eyebrow">购买后总部能看到</div>
          <strong>采纳回传</strong>
          <p className="muted">谁去了哪家店、生成了什么、采了哪条，直接变成计划和配券线索。</p>
          <span className="go">
            打开监控 <IconArrow />
          </span>
        </button>
        <button className="role-card" onClick={() => onPick("guide")}>
          <div className="eyebrow">同一套店级数据</div>
          <strong>导购主推</strong>
          <p className="muted">店内人员也能用同一家店的热销和活动，而不是凭经验。</p>
          <span className="go">
            看导购端 <IconArrow />
          </span>
        </button>
      </div>
    </div>
  );
}
