import { useMemo, useState } from "react";
import { STORES } from "../data/stores";
import { IconBack } from "../icons";

export function SearchStore({
  onBack,
  onOpenStore,
}: {
  onBack: () => void;
  onOpenStore: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const key = q.trim();
    return STORES.filter(
      (store) =>
        !key ||
        store.name.includes(key) ||
        store.retailer.includes(key) ||
        store.address.includes(key) ||
        store.city.includes(key) ||
        store.district.includes(key) ||
        store.sgStoreId.includes(key),
    );
  }, [q]);

  return (
    <div className="screen">
      <div className="app-header">
        <button className="chip ghost" onClick={onBack}>
          <span className="row">
            <IconBack /> 返回
          </span>
        </button>
        <span className="chip">手动找店</span>
      </div>
      <h1 className="h1" style={{ fontSize: 24 }}>
        手动找店
      </h1>
      <p className="muted" style={{ margin: "6px 0 14px" }}>
        识别不准时，搜索名称或零售商。
      </p>
      <input
        className="search-box"
        placeholder="搜索天娱、西城都荟、丽影…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {list.length === 0 && (
        <p className="empty-note" style={{ marginTop: 16 }}>
          没有匹配的归一门店。可试试「天娱」「西城」「丽影」或 sg_store_id。
        </p>
      )}
      <div className="stack" style={{ marginTop: 14 }}>
        {list.map((store) => (
          <button key={store.id} className="store-mini" onClick={() => onOpenStore(store.id)}>
            <div className="store-dot">SV</div>
            <div>
              <b>{store.name}</b>
              <div className="muted">
                {store.city}
                {store.district} · {store.platformsCovered[0]} · sg_store_id {store.sgStoreId}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
