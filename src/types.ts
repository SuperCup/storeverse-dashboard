export type Role = "dsr" | "hq" | "guide";

export type TimeRange = "d1" | "d7" | "d30";

/** 渠道：到店 / 到家。本片区门店到店能力标签多为否，到店档会走空态。 */
export type Channel = "instore" | "home";

export type AdviceKind = "supply" | "mechanism" | "price" | "season";

export type AdviceStatus = "pending" | "adopted" | "ignored";

/** 周边半径：1KM / 3KM */
export type Radius = "r1" | "r3";

export type PoiCount = {
  key: string;
  label: string;
  r1: number;
  r3: number;
};

export type Campaign = {
  id: string;
  name: string;
  platform: string;
  gmv: string;
  subsidy: string;
  roi: string;
  days: string;
  status: "good" | "broken" | "poor";
  note: string;
};

export type TopSku = {
  rank: number;
  name: string;
  /** 口径标签，例如「销量 TOP」「销售额 TOP」 */
  sku: string;
  upc: string;
  sales: string;
  note?: string;
};

export type SalesSlice = {
  topSkus: TopSku[];
  campaigns: Campaign[];
};

export type AiAdvice = {
  id: string;
  kind: AdviceKind;
  title: string;
  chain: string;
  reason: string;
  instruction: string;
  hqHint: string;
};

export type Store = {
  id: string;
  sgStoreId: string;
  name: string;
  retailer: string;
  businessType: string;
  province: string;
  city: string;
  district: string;
  address: string;
  tags: string[];
  platformsCovered: string[];
  platformsUncovered: string[];
  peakWeekday: string;
  peakWeekend: string;
  dataDate: string;
  brands: string[];
  roiHome: string;
  aovHome: string;
  skuSupply: string;
  bestMechHome: string;
  nearby: string;
  nearbyDetail: string;
  /** 1KM / 3KM 周边业态数量。有无沿用周边标签，数量按检索结果汇总。 */
  poiCounts: PoiCount[];
  slices: Record<TimeRange, SalesSlice>;
  advices: AiAdvice[];
  yesterdaySales: string;
  yesterdayDelta: string;
  weekTrend: number[];
  hotSkus: { rank: number; name: string; sku: string; sales: string; lift: string }[];
  campaign: {
    name: string;
    tag: string;
    effect: string;
    vsPlan: string;
    hint: string;
  };
  /** headline 是一句话抓手动作，line 是支撑它的事实口径 */
  opportunity: { headline: string; line: string };
  guidePushes: {
    id: string;
    sku: string;
    name: string;
    coupon: string;
    script: string;
    reason: string;
  }[];
};

export type AdviceReport = {
  id: string;
  storeId: string;
  createdAt: string;
  statuses: Record<string, AdviceStatus>;
};

export type HqVisit = {
  dsr: string;
  province: string;
  city: string;
  storeId: string;
  time: string;
  action: string;
};

export type Account = {
  name: string;
  loginId: string;
  role: string;
  region: string;
  dataDate: string;
};

export type ChannelSummary = {
  visits: string;
  gmv: string;
  subsidy: string;
  roi: string;
  /** 该渠道没有可用事实时的说明，有值即走空态 */
  emptyNote?: string;
};

export type VisitRecord = {
  storeId: string;
  time: string;
  action: string;
  gmv: string;
  subsidy: string;
  roi: string;
};
