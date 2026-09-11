import type { Account, Channel, ChannelSummary, VisitRecord } from "../types";

export const ACCOUNT: Account = {
  name: "高宇",
  loginId: "gaoyu",
  role: "DSR",
  region: "重庆片区",
  dataDate: "2026-08-31",
};

export const CHANNELS: { id: Channel; label: string }[] = [
  { id: "home", label: "到家" },
  { id: "instore", label: "到店" },
];

/** 到家为样例实数汇总；到店走空态——永辉样例门店的到店能力标签均为否。 */
export const CHANNEL_SUMMARY: Record<Channel, ChannelSummary> = {
  home: {
    visits: "3",
    gmv: "¥18,420",
    subsidy: "¥2,860",
    roi: "6.44",
  },
  instore: {
    visits: "3",
    gmv: "—",
    subsidy: "—",
    roi: "—",
    emptyNote: "本片区 3 家样例门店的到店能力标签均为「否」，暂无到店活动与补贴事实。",
  },
};

export const VISIT_RECORDS: Record<Channel, VisitRecord[]> = {
  home: [
    {
      storeId: "yh-nanan-wanda",
      time: "10:18",
      action: "拍照识店 → 看板",
      gmv: "¥6,180",
      subsidy: "¥1,050",
      roi: "5.87",
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
      storeId: "yh-xiaozhai",
      time: "09:40",
      action: "历史门店进入",
      gmv: "¥4,300",
      subsidy: "¥840",
      roi: "6.84",
    },
  ],
  instore: [
    {
      storeId: "yh-nanan-wanda",
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
      storeId: "yh-xiaozhai",
      time: "09:40",
      action: "历史门店进入",
      gmv: "—",
      subsidy: "—",
      roi: "—",
    },
  ],
};
