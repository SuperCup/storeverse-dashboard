export type Role = "dsr" | "hq" | "guide";

export type TimeRange = "d1" | "d7" | "d30";

export type AdviceKind = "supply" | "mechanism" | "price" | "season";

export type AdviceStatus = "pending" | "adopted" | "ignored";

export type NearbyPoi = {
  kind: string;
  name: string;
  distance: string;
};

export type PlatformStat = {
  id: string;
  name: string;
  capability: boolean;
  orders: string;
  gmv: string;
  subsidy: string;
  note?: string;
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

export type Mechanism = {
  name: string;
  gmvShare: string;
  subsidyShare: string;
  days: string;
  status: "good" | "broken" | "poor";
  note: string;
};

export type SalesSlice = {
  platforms: PlatformStat[];
  topSkus: TopSku[];
  mechanisms: Mechanism[];
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
  pois: NearbyPoi[];
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
