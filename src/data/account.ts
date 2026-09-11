import type { Account, Channel, ChannelSummary, VisitRecord } from "../types";

export const ACCOUNT: Account = {
  name: "smartgo",
  loginId: "smartgo",
  role: "DSR",
  region: "广州片区",
  dataDate: "2026-08-31",
};

export const CHANNELS: { id: Channel; label: string }[] = [
  { id: "home", label: "到家" },
  { id: "instore", label: "到店" },
];

/** 到家为广州片区实数汇总；到店走空态——本片区门店到店能力标签均为否。 */
export const CHANNEL_SUMMARY: Record<Channel, ChannelSummary> = {
  home: {
    visits: "3",
    gmv: "¥20,220",
    subsidy: "¥2,391",
    roi: "8.46",
  },
  instore: {
    visits: "3",
    gmv: "—",
    subsidy: "—",
    roi: "—",
    emptyNote: "本片区 3 家门店的到店能力标签均为「否」，暂无到店活动与补贴事实。",
  },
};

export const VISIT_RECORDS: Record<Channel, VisitRecord[]> = {
  home: [
    {
      storeId: "yh-tianyu",
      time: "10:18",
      action: "拍照识店 → 看板",
      gmv: "¥6,420",
      subsidy: "¥616",
      roi: "10.42",
    },
    {
      storeId: "yh-xicheng-duhui",
      time: "09:52",
      action: "生成建议 · 待采纳",
      gmv: "¥7,940",
      subsidy: "¥970",
      roi: "8.15",
    },
    {
      storeId: "yh-liying",
      time: "09:40",
      action: "历史门店进入",
      gmv: "¥5,860",
      subsidy: "¥805",
      roi: "7.28",
    },
  ],
  instore: [
    {
      storeId: "yh-tianyu",
      time: "10:18",
      action: "拍照识店 → 看板",
      gmv: "—",
      subsidy: "—",
      roi: "—",
    },
    {
      storeId: "yh-xicheng-duhui",
      time: "09:52",
      action: "生成建议 · 待采纳",
      gmv: "—",
      subsidy: "—",
      roi: "—",
    },
    {
      storeId: "yh-liying",
      time: "09:40",
      action: "历史门店进入",
      gmv: "—",
      subsidy: "—",
      roi: "—",
    },
  ],
};
