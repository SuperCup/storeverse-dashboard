import { getStore, GUIDE_BOUND_STORE_ID } from "../data/stores";

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const w = 320;
  const h = 72;
  const points = values
    .map((value, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - 8 - ((value - min) / (max - min || 1)) * (h - 16);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export function GuideHome({ onSwitchRole }: { onSwitchRole: () => void }) {
  const store = getStore(GUIDE_BOUND_STORE_ID);

  return (
    <div className="screen">
      <div className="app-header">
        <div style={{ minWidth: 0 }}>
          <div className="eyebrow cn">导购 · 我的门店</div>
          <div className="h2" style={{ fontSize: 17, lineHeight: 1.35 }}>
            {store.name}
          </div>
        </div>
        <button className="chip ghost" onClick={onSwitchRole}>
          切换角色
        </button>
      </div>

      <div className="tag-row" style={{ marginBottom: 12 }}>
        {store.tags.map((tag) => (
          <span className="tag forest" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="stack">
        {store.guidePushes.map((push) => (
          <div className="push-card" key={push.id}>
            <div className="kicker">TODAY PUSH</div>
            <div className="h2" style={{ fontSize: 17, marginTop: 6, lineHeight: 1.35 }}>
              {push.name}
            </div>
            <span className="coupon">{push.coupon}</span>
            <p className="muted">{push.script}</p>
            <div className="reason" style={{ marginTop: 10 }}>
              为什么：{push.reason}
            </div>
          </div>
        ))}
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          昨日销量
        </div>
        <span className="muted">演示推算值</span>
      </div>
      <div className="card">
        <div className="row space">
          <b style={{ fontSize: 22 }}>{store.yesterdaySales}</b>
          <span className="tag">{store.yesterdayDelta}</span>
        </div>
        <Sparkline values={store.weekTrend} />
        <div className="muted">近 7 日到家销量趋势</div>
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          热销 SKU
        </div>
      </div>
      <div className="card">
        {store.hotSkus.map((sku) => (
          <div className="sku-line" key={sku.sku}>
            <div>
              <b>
                {sku.rank}. {sku.name}
              </b>
              <div className="muted">
                69码 {sku.sku} · {sku.sales}
              </div>
            </div>
            <span className="tag accent">{sku.lift}</span>
          </div>
        ))}
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          当前活动
        </div>
      </div>
      <div className="card">
        <span className="tag accent">{store.campaign.tag}</span>
        <div className="h2" style={{ fontSize: 16, margin: "8px 0 6px" }}>
          {store.campaign.name}
        </div>
        <p style={{ fontSize: 14 }}>{store.campaign.effect}</p>
        <p className="muted" style={{ marginTop: 6 }}>
          {store.campaign.vsPlan}。{store.campaign.hint}
        </p>
      </div>
      <div className="connect">
        已绑定 StoreVerse 归一门店 <code>sg_store_id {store.sgStoreId}</code> · 数据日期 {store.dataDate}
      </div>
    </div>
  );
}
