import { useEffect, useState } from "react";
import { ADVICE_KIND_LABEL, HQ_SEED_VISITS, STORES, TIME_RANGES, getStore } from "../data/stores";
import { IconBack } from "../icons";
import type { AdviceReport, Store, TimeRange } from "../types";

const GEN_STEPS = ["检查供给：有没有货", "检查动销：卖得好不好", "检查机制：投得对不对", "检查补贴：预算够不够"];

function GeneratingPanel({ storeName }: { storeName: string }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t1 = window.setTimeout(() => setStep(1), 550);
    const t2 = window.setTimeout(() => setStep(2), 1100);
    const t3 = window.setTimeout(() => setStep(3), 1650);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);
  return (
    <div className="screen">
      <div className="gen-panel">
        <div className="eyebrow">AI 运营指导</div>
        <div className="h2" style={{ margin: "8px 0 16px" }}>
          按供给 → 动销 → 机制 → 补贴 逐项判断
        </div>
        <ol className="gen-steps">
          {GEN_STEPS.map((label, index) => (
            <li key={label} className={index <= step ? "on" : ""}>
              <span className="step-dot">{index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <p className="muted" style={{ marginTop: 18 }}>
          正在用 {storeName} 的周边标签、三平台销量和机制预算生成可采纳建议…
        </p>
      </div>
    </div>
  );
}

export function StoreBoard({
  store,
  reports,
  onBack,
  onGenerate,
  onOpenReport,
}: {
  store: Store;
  reports: AdviceReport[];
  onBack: () => void;
  onGenerate: () => void;
  onOpenReport: (reportId: string) => void;
}) {
  const [range, setRange] = useState<TimeRange>("d30");
  const slice = store.slices[range];
  const storeReports = reports.filter((item) => item.storeId === store.id);

  return (
    <div className="screen has-sticky">
      <div className="app-header">
        <button className="chip ghost" onClick={onBack}>
          <span className="row">
            <IconBack /> 跑店
          </span>
        </button>
        <span className="chip">销售看板</span>
      </div>

      <div className="answer-hero">
        <div className="eyebrow">
          {store.retailer} · {store.businessType} · {store.city}
          {store.district}
        </div>
        <div className="name">{store.name}</div>
        <div className="tag-row">
          {store.tags.map((tag) => (
            <span className="tag forest" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <p className="muted" style={{ marginTop: 10 }}>
          {store.address}
        </p>
        <p className="muted">{store.nearbyDetail}</p>
        <div className="live-row">
          <span className="live-pill">
            <i /> {store.platformsCovered.join(" / ")}
          </span>
          <span className="live-pill">sg {store.sgStoreId}</span>
        </div>
        <div className="metrics" style={{ marginTop: 12 }}>
          <div className="metric">
            <div className="muted">到家 ROI</div>
            <b>{store.roiHome}</b>
          </div>
          <div className="metric">
            <div className="muted">到家笔单价</div>
            <b>{store.aovHome}</b>
          </div>
          <div className="metric">
            <div className="muted">在售 SKU</div>
            <b>{store.skuSupply}</b>
          </div>
          <div className="metric">
            <div className="muted">最优机制</div>
            <b style={{ fontSize: 14 }}>{store.bestMechHome}</b>
          </div>
        </div>
        <div className="opp-band">
          <div className="k">本店可行动空间</div>
          <b>{store.opportunity.amount}</b>
          <div className="muted">{store.opportunity.line}</div>
        </div>
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          周边 POI 标签
        </div>
        <span className="muted">{store.nearby}</span>
      </div>
      <div className="card">
        {store.pois.map((poi) => (
          <div className="sku-line" key={`${poi.kind}-${poi.name}`}>
            <div>
              <b>{poi.name}</b>
              <div className="muted">{poi.kind}</div>
            </div>
            <span className="tag">{poi.distance}</span>
          </div>
        ))}
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          高峰与品牌
        </div>
      </div>
      <div className="card">
        <div className="sku-line">
          <div>
            <b>工作日高峰</b>
            <div className="muted">a11_peak_weekday</div>
          </div>
          <span className="tag accent">{store.peakWeekday}</span>
        </div>
        <div className="sku-line">
          <div>
            <b>周末高峰</b>
            <div className="muted">a12_peak_weekend</div>
          </div>
          <span className="tag accent">{store.peakWeekend}</span>
        </div>
        <div className="muted" style={{ marginTop: 8 }}>
          近90天高频品牌：{store.brands.join("、")}
        </div>
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          到家平台能力
        </div>
        <span className="muted">近30天实数为主</span>
      </div>
      <div className="tabs">
        {TIME_RANGES.map((item) => (
          <button
            key={item.id}
            className={`tab${range === item.id ? " on" : ""}`}
            onClick={() => setRange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="stack">
        {slice.platforms.map((platform) => (
          <div className={`card plat ${platform.id}`} key={platform.id}>
            <div className="row space">
              <b>{platform.name}</b>
              <span className={platform.capability ? "tag forest" : "tag"}>
                {platform.capability ? "已覆盖" : "未覆盖"}
              </span>
            </div>
            <div className="metrics" style={{ marginTop: 10 }}>
              <div>
                <div className="muted">订单</div>
                <b style={{ fontSize: 14 }}>{platform.orders}</b>
              </div>
              <div>
                <div className="muted">销售/补贴</div>
                <b style={{ fontSize: 14 }}>
                  {platform.gmv} · {platform.subsidy}
                </b>
              </div>
            </div>
            {platform.note && (
              <div className="muted" style={{ marginTop: 8 }}>
                {platform.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          Top SKU
        </div>
        <span className="muted">69码 / 销售</span>
      </div>
      <div className="card">
        {slice.topSkus.map((sku) => (
          <div className="sku-line" key={`${sku.upc}-${sku.rank}`}>
            <div>
              <b>
                {sku.rank}. {sku.name}
              </b>
              <div className="muted">
                {sku.sku} · UPC {sku.upc} · {sku.sales}
              </div>
            </div>
            <span className={sku.note ? "tag warn" : "tag forest"}>{sku.note ?? "动销"}</span>
          </div>
        ))}
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          机制效果
        </div>
      </div>
      <div className="stack">
        {slice.mechanisms.map((mech) => (
          <div className="card" key={mech.name}>
            <div className="row space">
              <b>{mech.name}</b>
              <span
                className={
                  mech.status === "good" ? "tag forest" : mech.status === "broken" ? "tag warn" : "tag danger"
                }
              >
                {mech.status === "good" ? "健康" : mech.status === "broken" ? "断档" : "OI 差"}
              </span>
            </div>
            <p className="muted" style={{ marginTop: 6 }}>
              {mech.gmvShare} · {mech.subsidyShare}
            </p>
            <p className="muted">{mech.days}</p>
            <div className="reason" style={{ marginTop: 8 }}>
              {mech.note}
            </div>
          </div>
        ))}
      </div>

      {storeReports.length > 0 && (
        <>
          <div className="section-title">
            <div className="h2" style={{ fontSize: 16 }}>
              历史运营建议
            </div>
          </div>
          <div className="stack">
            {storeReports.map((report) => {
              const adopted = Object.values(report.statuses).filter((s) => s === "adopted").length;
              const ignored = Object.values(report.statuses).filter((s) => s === "ignored").length;
              return (
                <button key={report.id} className="store-mini" onClick={() => onOpenReport(report.id)}>
                  <div className="store-dot">AI</div>
                  <div>
                    <b>{report.createdAt} 生成</b>
                    <div className="muted">
                      采纳 {adopted} · 忽略 {ignored}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="connect">
        StoreVerse sg_store_id {store.sgStoreId} · 数据日期 {store.dataDate} · 不与客户门店后台拉通
      </div>
      <div className="sticky-gen">
        <button className="gen-btn" onClick={onGenerate}>
          生成运营建议
        </button>
        <div className="muted" style={{ textAlign: "center", marginTop: 6 }}>
          AI 运营指导 · 结合标签、销量和机制
        </div>
      </div>
    </div>
  );
}

export function AdviceResult({
  store,
  report,
  generating,
  onBack,
  onSetStatus,
}: {
  store: Store;
  report: AdviceReport;
  generating: boolean;
  onBack: () => void;
  onSetStatus: (adviceId: string, status: "adopted" | "ignored") => void;
}) {
  if (generating) {
    return <GeneratingPanel storeName={store.name} />;
  }

  return (
    <div className="screen">
      <div className="app-header">
        <button className="chip ghost" onClick={onBack}>
          <span className="row">
            <IconBack /> 看板
          </span>
        </button>
        <span className="chip">AI 建议</span>
      </div>
      <p className="muted" style={{ marginBottom: 12 }}>
        无法直连门店后台做上架。请对每条建议选择采纳或忽略，采纳结果可上报总部。
      </p>
      <div className="stack">
        {store.advices.map((advice) => {
          const status = report.statuses[advice.id] ?? "pending";
          return (
            <div className="card advice" key={advice.id}>
              <div className="row space">
                <span className={advice.kind === "supply" ? "tag forest" : advice.kind === "price" ? "tag warn" : "tag accent"}>
                  {ADVICE_KIND_LABEL[advice.kind]}
                </span>
                {status !== "pending" && (
                  <span className={status === "adopted" ? "tag forest" : "tag"}>{status === "adopted" ? "已采纳" : "已忽略"}</span>
                )}
              </div>
              <div className="h2" style={{ fontSize: 15 }}>
                {advice.title}
              </div>
              <p className="instruction">{advice.instruction}</p>
              <div className="reason">判断链：{advice.chain}</div>
              <div className="reason">为什么：{advice.reason}</div>
              <div className="muted" style={{ fontSize: 12 }}>
                上报总部：{advice.hqHint}
              </div>
              {status === "pending" && (
                <div className="vote-row">
                  <button className="vote up" onClick={() => onSetStatus(advice.id, "adopted")}>
                    采纳
                  </button>
                  <button className="vote down" onClick={() => onSetStatus(advice.id, "ignored")}>
                    忽略
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HqHome({
  reports,
  historyIds,
  onSwitchRole,
  onOpenStore,
}: {
  reports: AdviceReport[];
  historyIds: string[];
  onSwitchRole: () => void;
  onOpenStore: (storeId: string) => void;
}) {
  const adopted = reports.reduce(
    (sum, report) => sum + Object.values(report.statuses).filter((s) => s === "adopted").length,
    0,
  );
  const ignored = reports.reduce(
    (sum, report) => sum + Object.values(report.statuses).filter((s) => s === "ignored").length,
    0,
  );
  const pending = reports.reduce(
    (sum, report) => sum + Object.values(report.statuses).filter((s) => s === "pending").length,
    0,
  );

  return (
    <div className="screen">
      <div className="app-header">
        <div>
          <div className="kicker">HQ CONSOLE</div>
          <div className="h2" style={{ fontSize: 18 }}>
            DSR 运营监控台
          </div>
        </div>
        <button className="chip ghost" onClick={onSwitchRole}>
          角色
        </button>
      </div>
      <p className="muted">
        管理后台本期形态：监控一线用了什么、采了什么。不是全国经营驾驶舱，也不直连客户订货系统。门店主数据来自 StoreVerse 归一门店。
      </p>

      <div className="opp-band" style={{ marginTop: 12 }}>
        <div className="k">今日样例盘面</div>
        <b>3 省 · 3 店在跑</b>
        <div className="muted">重庆南岸万达 / 广州西城都荟 / 西安小寨西路 · 数据日期 2026-08-31</div>
      </div>

      <div className="metrics" style={{ marginTop: 14 }}>
        <div className="metric">
          <div className="muted">活跃 DSR</div>
          <b>3</b>
        </div>
        <div className="metric">
          <div className="muted">覆盖城市</div>
          <b>3</b>
        </div>
        <div className="metric">
          <div className="muted">生成报告</div>
          <b>{reports.length}</b>
        </div>
        <div className="metric">
          <div className="muted">待处理建议</div>
          <b>{pending}</b>
        </div>
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          采纳漏斗
        </div>
      </div>
      <div className="metrics">
        <div className="metric">
          <div className="muted">已采纳</div>
          <b className="up">{adopted}</b>
        </div>
        <div className="metric">
          <div className="muted">已忽略</div>
          <b>{ignored}</b>
        </div>
        <div className="metric">
          <div className="muted">本机会话门店</div>
          <b>{historyIds.length}</b>
        </div>
        <div className="metric">
          <div className="muted">可配券线索</div>
          <b>{adopted}</b>
        </div>
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          一线动态
        </div>
      </div>
      <div className="stack">
        {HQ_SEED_VISITS.map((visit) => {
          const store = getStore(visit.storeId);
          return (
            <button key={`${visit.dsr}-${visit.time}`} className="store-mini" onClick={() => onOpenStore(visit.storeId)}>
              <div className="store-dot">DSR</div>
              <div>
                <b>
                  {visit.dsr} · {store.name}
                </b>
                <div className="muted">
                  {visit.province}
                  {visit.city} · {visit.time} · {visit.action}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          建议回传
        </div>
      </div>
      {reports.length === 0 ? (
        <p className="muted">还没有生成记录。请先用 DSR 角色拍店并生成建议，采纳结果会出现在这里。</p>
      ) : (
        <div className="stack">
          {reports.map((report) => {
            const a = Object.values(report.statuses).filter((s) => s === "adopted").length;
            const i = Object.values(report.statuses).filter((s) => s === "ignored").length;
            const store = getStore(report.storeId);
            return (
              <button key={report.id} className="store-mini" onClick={() => onOpenStore(report.storeId)}>
                <div className="store-dot">报</div>
                <div>
                  <b>{store.name}</b>
                  <div className="muted">
                    {report.createdAt} · 采纳 {a} · 忽略 {i} · ROI {store.roiHome}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="section-title">
        <div className="h2" style={{ fontSize: 16 }}>
          样例门店库
        </div>
        <span className="muted">归一门店</span>
      </div>
      <div className="stack">
        {STORES.map((store) => (
          <button key={store.id} className="store-mini" onClick={() => onOpenStore(store.id)}>
            <div className="store-dot">SV</div>
            <div>
              <b>{store.name}</b>
              <div className="muted">
                {store.city}
                {store.district} · {store.platformsCovered[0]} · sg {store.sgStoreId}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
