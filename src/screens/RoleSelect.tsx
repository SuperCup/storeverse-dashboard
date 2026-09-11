import { IconArrow } from "../icons";
import type { Role } from "../types";

export function RoleSelect({ onPick }: { onPick: (role: Role) => void }) {
  return (
    <div className="screen">
      <div className="role-hero">
        <div className="kicker">STOREVERSE OPS AI</div>
        <h1 className="h1" style={{ marginTop: 10 }}>
          拍下门头
          <br />
          10 秒读懂这家店该怎么做
        </h1>
        <p className="muted">把到家订单、机制补贴和周边标签变成可采纳的运营动作。一线当场用，总部只看采纳。</p>
        <div className="sell-grid">
          <div>
            <b>到家 3 平台</b>
            <span className="muted">淘宝闪购 / 京东秒送 / 美团闪购</span>
          </div>
          <div>
            <b>1 条判断链</b>
            <span className="muted">供给 → 动销 → 机制 → 补贴</span>
          </div>
        </div>
      </div>
      <div className="role-cards">
        <button className="role-card" onClick={() => onPick("dsr")}>
          <div className="eyebrow">现场演示</div>
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
