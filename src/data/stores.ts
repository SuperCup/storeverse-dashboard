import type { HqVisit, Radius, SalesSlice, Store, TimeRange } from "../types";

export const TIME_RANGES: { id: TimeRange; label: string }[] = [
  { id: "d1", label: "昨天" },
  { id: "d7", label: "近 7 天" },
  { id: "d30", label: "近 30 天" },
];

export const RADIUS_OPTIONS: { id: Radius; label: string }[] = [
  { id: "r1", label: "1KM" },
  { id: "r3", label: "3KM" },
];

export const ADVICE_KIND_LABEL: Record<string, string> = {
  supply: "供给",
  mechanism: "机制",
  price: "价格",
  season: "季节",
};

function slice(topSkus: SalesSlice["topSkus"], campaigns: SalesSlice["campaigns"]): SalesSlice {
  return { topSkus, campaigns };
}

/** 样例来源：docs/sample-data/永辉门店标签_*.csv。三家均为广州归一门店。 */
export const STORES: Store[] = [
  {
    id: "yh-tianyu",
    sgStoreId: "117209",
    name: "永辉超市(天娱广场店)",
    retailer: "永辉超市",
    businessType: "大型商超",
    province: "广东",
    city: "广州",
    district: "天河区",
    address: "天河路621-625号天河娱乐广场负1层",
    tags: ["商圈", "地铁", "高校", "写字楼"],
    platformsCovered: ["到家-淘宝闪购"],
    platformsUncovered: ["京东秒送", "美团闪购"],
    peakWeekday: "下午 14:00-17:59",
    peakWeekend: "下午 14:00-17:59",
    dataDate: "2026-08-31",
    brands: ["伊利奶粉", "伊利低温", "康师傅", "海天", "锐澳", "太粮米业", "妙可蓝多", "溜溜梅", "脉动", "舒客"],
    roiHome: "10.42",
    aovHome: "¥20.70",
    skuSupply: "276",
    bestMechHome: "商品满减券",
    nearby: "天河商圈 · 地铁 · 写字楼 · 高校客流",
    nearbyDetail: "周边画像：天河路商圈，地铁与写字楼叠加，下午档动销更集中。",
    poiCounts: [
      { key: "community", label: "社区数", r1: 5, r3: 19 },
      { key: "hospital", label: "医院数", r1: 2, r3: 8 },
      { key: "school", label: "学校数", r1: 6, r3: 22 },
      { key: "mall", label: "商业中心数", r1: 4, r3: 11 },
      { key: "hypermarket", label: "同类商超数", r1: 3, r3: 10 },
    ],
    slices: {
      d30: slice(
        [
          {
            rank: 1,
            name: "商品名未回传",
            sku: "销售额 TOP",
            upc: "6927096515871",
            sales: "近 30 天 ¥54.90",
            note: "供给表未提供该 69 码的商品名称",
          },
          {
            rank: 2,
            name: "康师傅 PREMIUM 优选鲜虾鱼板面杯",
            sku: "销量 TOP",
            upc: "6937962143909",
            sales: "近 30 天件次最高",
          },
        ],
        [
          {
            id: "c30-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥6,420",
            subsidy: "¥616",
            roi: "10.42",
            days: "近 30 天在投 30 天",
            status: "good",
            note: "本店到家最优机制。到店订单标签为「否」，属于纯到家门店，不要推荐到店券。",
          },
        ],
      ),
      d7: slice(
        [
          {
            rank: 1,
            name: "康师傅 PREMIUM 优选鲜虾鱼板面杯",
            sku: "销量 TOP",
            upc: "6937962143909",
            sales: "周动销靠前",
          },
        ],
        [
          {
            id: "c7-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥1,510",
            subsidy: "¥145",
            roi: "10.41",
            days: "近 7 天在投 7 天",
            status: "good",
            note: "周峰值集中在下午档，高频品牌为伊利、康师傅、海天、太粮。",
          },
        ],
      ),
      d1: slice(
        [
          {
            rank: 1,
            name: "康师傅 PREMIUM 优选鲜虾鱼板面杯",
            sku: "销量 TOP",
            upc: "6937962143909",
            sales: "昨日仍有动销",
          },
        ],
        [
          {
            id: "c1-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥218",
            subsidy: "¥21",
            roi: "10.38",
            days: "昨日在投",
            status: "good",
            note: "笔单价参考 ¥20.70，工作日与周末高峰均为下午 14:00-17:59。",
          },
        ],
      ),
    },
    advices: [
      {
        id: "a1",
        kind: "mechanism",
        title: "保住淘宝闪购「商品满减券」，ROI 已处高位",
        chain: "供给有货 → 动销成立 → 机制对 → 先看 ROI",
        reason: "该店覆盖平台仅「到家-淘宝闪购」，近 30 天到家最优机制为商品满减券，ROI 10.42，且没有到店订单。",
        instruction: "采纳后上报总部：本店继续以淘宝闪购满减为主，京东/美团本期不扩。",
        hqHint: "可纳入天河天娱单平台深耕计划",
      },
      {
        id: "a2",
        kind: "season",
        title: "天河写字楼客群：下午档加码，不必按社区囤货逻辑备周末",
        chain: "周边标签 × 高峰时段 → 调整供给与档期",
        reason: "周边为天河商圈、地铁与写字楼；工作日与周末高峰均为下午 14:00-17:59。",
        instruction: "把满减曝光和拣货人力压到下午档；周末不必按家庭囤货店加纸品。",
        hqHint: "可配置下午档城市机制",
      },
      {
        id: "a3",
        kind: "supply",
        title: "盯住销量 TOP 方便面与销售额 TOP 69 码，避免空销",
        chain: "先看供给 → 再谈机制",
        reason: "销量最高：康师傅 PREMIUM 鲜虾鱼板面杯（69码 6937962143909）；销售额最高：69码 6927096515871，供给表未回传商品名。在售 SKU 276。",
        instruction: "到店核对这两款是否断货；采纳记入供给巡检，不直连门店后台下单。",
        hqHint: "进入门店供给巡检清单",
      },
      {
        id: "a4",
        kind: "mechanism",
        title: "高频品牌以伊利 / 康师傅 / 海天为主推，勿散打",
        chain: "动销品牌 TOP → 机制投放聚焦",
        reason: "近 90 天高频活动品牌：伊利奶粉、伊利低温、康师傅、海天、锐澳、太粮米业等。",
        instruction: "满减券优先绑这些品牌货盘；忽略无动销长尾品。",
        hqHint: "品牌货盘与机制绑定",
      },
    ],
    yesterdaySales: "¥5,120",
    yesterdayDelta: "笔单价参考 ¥20.70",
    weekTrend: [18, 19, 17, 21, 22, 20, 23],
    hotSkus: [
      { rank: 1, name: "康师傅 PREMIUM 优选鲜虾鱼板面杯", sku: "6937962143909", sales: "近 30 天件次最高", lift: "销量 TOP" },
      { rank: 2, name: "商品名未回传", sku: "6927096515871", sales: "近 30 天 ¥54.90", lift: "销售额 TOP" },
    ],
    campaign: {
      name: "淘宝闪购 · 商品满减券",
      tag: "到家最优机制",
      effect: "到家 ROI 10.42 · 笔单价 ¥20.70",
      vsPlan: "单平台店，满减为唯一主机制",
      hint: "到店能力标签均为否，不要推荐微信支付到店券。",
    },
    opportunity: {
      headline: "下午档满减深挖",
      line: "单平台淘宝闪购 · 到家 ROI 10.42 · 工作日与周末高峰同为 14:00-17:59",
    },
    guidePushes: [
      {
        id: "g1",
        sku: "6937962143909",
        name: "康师傅 PREMIUM 优选鲜虾鱼板面杯",
        coupon: "淘宝闪购满减",
        script: "这是本店近 30 天销量最高款，走闪购满减更合适。",
        reason: "销量 TOP × 商品满减券",
      },
    ],
  },
  {
    id: "yh-xicheng-duhui",
    sgStoreId: "73600",
    name: "永辉超市(西城都荟店)",
    retailer: "永辉超市",
    businessType: "大型商超",
    province: "广东",
    city: "广州",
    district: "荔湾区",
    address: "黄沙大道8号第2层212号商铺",
    tags: ["商圈", "成熟社区", "CBD", "地铁", "学校"],
    platformsCovered: ["到家-淘宝闪购"],
    platformsUncovered: ["京东秒送", "美团闪购"],
    peakWeekday: "下午 14:00-17:59",
    peakWeekend: "晚间 18:00-22:59",
    dataDate: "2026-08-31",
    brands: ["太粮米业", "伊利奶粉", "康师傅", "海天", "妙可蓝多", "景兴", "伊利低温", "舒客", "嘉士伯", "蒙牛冰品"],
    roiHome: "8.15",
    aovHome: "¥33.80",
    skuSupply: "338",
    bestMechHome: "商品满减券",
    nearby: "商圈 · 成熟社区 · CBD · 地铁 · 学校",
    nearbyDetail: "周边画像：黄沙商圈叠加成熟社区与学校，到家 ROI 处于同城高位。",
    poiCounts: [
      { key: "community", label: "社区数", r1: 9, r3: 34 },
      { key: "hospital", label: "医院数", r1: 1, r3: 6 },
      { key: "school", label: "学校数", r1: 5, r3: 18 },
      { key: "mall", label: "商业中心数", r1: 2, r3: 7 },
      { key: "hypermarket", label: "同类商超数", r1: 3, r3: 12 },
    ],
    slices: {
      d30: slice(
        [
          {
            rank: 1,
            name: "商品名未回传",
            sku: "销售额 TOP",
            upc: "6927096515628",
            sales: "近 30 天 ¥247.20",
            note: "供给表未提供该 69 码的商品名称",
          },
          {
            rank: 2,
            name: "ABC K53 亲柔立围棉柔迷你卫生巾 8 片",
            sku: "销量 TOP",
            upc: "6922731882516",
            sales: "近 30 天件次最高",
          },
        ],
        [
          {
            id: "c30-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥7,940",
            subsidy: "¥970",
            roi: "8.15",
            days: "近 30 天在投 30 天",
            status: "good",
            note: "同城 ROI 健康，机制可优先扩量而非停投。在售 SKU 338，笔单价 ¥33.80。",
          },
        ],
      ),
      d7: slice(
        [
          {
            rank: 1,
            name: "ABC K53 亲柔立围棉柔迷你卫生巾 8 片",
            sku: "销量 TOP",
            upc: "6922731882516",
            sales: "周动销靠前",
          },
        ],
        [
          {
            id: "c7-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥1,870",
            subsidy: "¥228",
            roi: "8.20",
            days: "近 7 天在投 7 天",
            status: "good",
            note: "品牌面宽，太粮、伊利、康师傅、海天等 TOP10 齐全。",
          },
        ],
      ),
      d1: slice(
        [
          {
            rank: 1,
            name: "商品名未回传",
            sku: "销售额 TOP",
            upc: "6927096515628",
            sales: "近 30 天 ¥247.20",
            note: "供给表未提供该 69 码的商品名称",
          },
        ],
        [
          {
            id: "c1-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥286",
            subsidy: "¥35",
            roi: "8.17",
            days: "昨日在投",
            status: "good",
            note: "周末高峰转晚间 18:00-22:59，与工作日下午档不同，预算需分时拆。",
          },
        ],
      ),
    },
    advices: [
      {
        id: "b1",
        kind: "mechanism",
        title: "ROI 8.15，建议追加淘宝闪购满减预算",
        chain: "供给足 → 动销好 → 机制对 → 补贴可加",
        reason: "到家 ROI 8.15；最优机制仍是商品满减券；在售 SKU 338。",
        instruction: "采纳后向总部申请本店满减追加；不建议停投。",
        hqHint: "可直接进入配券/追加预算",
      },
      {
        id: "b2",
        kind: "season",
        title: "工作日打下午档，周末打晚高峰",
        chain: "高峰标签分流 → 档期错峰",
        reason: "工作日高峰下午 14:00-17:59；周末高峰晚间 18:00-22:59。",
        instruction: "满减投放按时段拆预算，避免周末仍只投下午。",
        hqHint: "城市档期分时配置",
      },
    ],
    yesterdaySales: "¥6,420",
    yesterdayDelta: "笔单价参考 ¥33.80",
    weekTrend: [20, 21, 19, 23, 24, 28, 26],
    hotSkus: [
      { rank: 1, name: "ABC K53 亲柔立围棉柔迷你卫生巾 8 片", sku: "6922731882516", sales: "近 30 天件次最高", lift: "销量 TOP" },
      { rank: 2, name: "商品名未回传", sku: "6927096515628", sales: "近 30 天 ¥247.20", lift: "销售额 TOP" },
    ],
    campaign: {
      name: "淘宝闪购 · 商品满减券",
      tag: "高 ROI",
      effect: "到家 ROI 8.15 · 笔单价 ¥33.80",
      vsPlan: "机制健康，适合加码",
      hint: "品牌 TOP10 齐全，适合做品牌捆绑满减。",
    },
    opportunity: {
      headline: "满减追加预算",
      line: "到家 ROI 8.15 · 在售 SKU 338 · 工作日下午档 + 周末晚高峰",
    },
    guidePushes: [
      {
        id: "wg1",
        sku: "6922731882516",
        name: "ABC K53 迷你卫生巾",
        coupon: "淘宝闪购满减",
        script: "这是销量最高款，走闪购满减。",
        reason: "销量 TOP × ROI 8.15",
      },
    ],
  },
  {
    id: "yh-liying",
    sgStoreId: "121847",
    name: "永辉超市(丽影广场店)",
    retailer: "永辉超市",
    businessType: "大型商超",
    province: "广东",
    city: "广州",
    district: "海珠区",
    address: "新港中路丽影广场",
    tags: ["商圈", "成熟社区", "CBD", "地铁", "学校"],
    platformsCovered: ["到家-淘宝闪购"],
    platformsUncovered: ["京东秒送", "美团闪购"],
    peakWeekday: "晚间 18:00-22:59",
    peakWeekend: "晚间 18:00-22:59",
    dataDate: "2026-08-31",
    brands: ["海天", "伊利奶粉", "伊利低温", "太粮米业", "康师傅", "嘉士伯", "妙可蓝多", "景兴"],
    roiHome: "7.28",
    aovHome: "¥24.60",
    skuSupply: "312",
    bestMechHome: "商品满减券",
    nearby: "商圈 · 成熟社区 · CBD · 地铁 · 学校",
    nearbyDetail: "周边画像：新港中路丽影广场，地铁与学校叠加，晚高峰更集中。",
    poiCounts: [
      { key: "community", label: "社区数", r1: 11, r3: 36 },
      { key: "hospital", label: "医院数", r1: 2, r3: 9 },
      { key: "school", label: "学校数", r1: 7, r3: 23 },
      { key: "mall", label: "商业中心数", r1: 3, r3: 9 },
      { key: "hypermarket", label: "同类商超数", r1: 4, r3: 13 },
    ],
    slices: {
      d30: slice(
        [
          {
            rank: 1,
            name: "金典鲜牛奶 450ml",
            sku: "销量 TOP",
            upc: "6907992106601",
            sales: "近 30 天件次最高",
          },
          {
            rank: 2,
            name: "海天永辉定制 & 油趣工坊有机山茶油 1L",
            sku: "销售额 TOP",
            upc: "6977168342348",
            sales: "近 30 天 ¥168.00",
          },
        ],
        [
          {
            id: "c30-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥5,860",
            subsidy: "¥805",
            roi: "7.28",
            days: "近 30 天在投 30 天",
            status: "good",
            note: "晚高峰店，满减投放应配乳品与粮油货盘，不要只投下午档。",
          },
        ],
      ),
      d7: slice(
        [
          {
            rank: 1,
            name: "金典鲜牛奶 450ml",
            sku: "销量 TOP",
            upc: "6907992106601",
            sales: "晚高峰动销",
          },
        ],
        [
          {
            id: "c7-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥1,380",
            subsidy: "¥190",
            roi: "7.26",
            days: "近 7 天在投 7 天",
            status: "good",
            note: "GMV 集中在晚间 18:00-22:59，主要品牌为海天、伊利、太粮、康师傅。",
          },
        ],
      ),
      d1: slice(
        [
          {
            rank: 1,
            name: "海天永辉定制 & 油趣工坊有机山茶油 1L",
            sku: "销售额 TOP",
            upc: "6977168342348",
            sales: "近 30 天 ¥168.00",
          },
        ],
        [
          {
            id: "c1-1",
            name: "商品满减券",
            platform: "淘宝闪购",
            gmv: "¥196",
            subsidy: "¥27",
            roi: "7.26",
            days: "昨日在投",
            status: "good",
            note: "笔单价参考 ¥24.60，晚高峰前需完成乳品与粮油补货沟通。",
          },
        ],
      ),
    },
    advices: [
      {
        id: "c1",
        kind: "mechanism",
        title: "淘宝闪购「商品满减券」继续投，晚高峰预算单独拆",
        chain: "平台能力 → 机制名匹配",
        reason: "该店覆盖平台为「到家-淘宝闪购」，最优机制是商品满减券，到家 ROI 7.28。",
        instruction: "采纳后按晚高峰加码满减预算，不要把天河下午档模板照搬过来。",
        hqHint: "按片区高峰拆机制模板",
      },
      {
        id: "c2",
        kind: "season",
        title: "丽影晚高峰：18:00-22:59 保障乳品与粮油供给",
        chain: "高峰 × 热销品 → 供给",
        reason: "工作日/周末高峰都是晚间 18:00-22:59；销量 TOP 金典鲜牛奶，销售额 TOP 海天山茶油。",
        instruction: "傍晚前完成乳品与粮油补货沟通；采纳记入晚高峰供给。",
        hqHint: "海珠丽影晚高峰供给计划",
      },
    ],
    yesterdaySales: "¥5,480",
    yesterdayDelta: "笔单价参考 ¥24.60",
    weekTrend: [18, 17, 19, 20, 22, 24, 23],
    hotSkus: [
      { rank: 1, name: "金典鲜牛奶 450ml", sku: "6907992106601", sales: "近 30 天件次最高", lift: "销量 TOP" },
      { rank: 2, name: "海天永辉定制有机山茶油 1L", sku: "6977168342348", sales: "近 30 天 ¥168.00", lift: "销售额 TOP" },
    ],
    campaign: {
      name: "淘宝闪购 · 商品满减券",
      tag: "到家最优机制",
      effect: "到家 ROI 7.28 · 笔单价 ¥24.60",
      vsPlan: "晚高峰店，券要配乳品粮油",
      hint: "与天河下午档店策略不同，按高峰拆预算。",
    },
    opportunity: {
      headline: "晚高峰满减配乳品粮油",
      line: "淘宝闪购 · 到家 ROI 7.28 · 工作日与周末高峰同为 18:00-22:59",
    },
    guidePushes: [
      {
        id: "xg1",
        sku: "6907992106601",
        name: "金典鲜牛奶 450ml",
        coupon: "淘宝闪购满减",
        script: "晚高峰这款走得最快，有满减先推它。",
        reason: "销量 TOP × 晚间 18:00-22:59",
      },
    ],
  },
];

export const DEMO_STORE_ID = "yh-tianyu";
export const GUIDE_BOUND_STORE_ID = "yh-tianyu";
export const INITIAL_HISTORY_IDS = ["yh-xicheng-duhui", "yh-liying"];

export const HQ_SEED_VISITS: HqVisit[] = [
  {
    dsr: "smartgo",
    province: "广东",
    city: "广州",
    storeId: "yh-tianyu",
    time: "10:18",
    action: "拍照识店 → 看板",
  },
  {
    dsr: "李倩",
    province: "广东",
    city: "广州",
    storeId: "yh-xicheng-duhui",
    time: "09:52",
    action: "生成建议 · 待采纳",
  },
  {
    dsr: "王磊",
    province: "广东",
    city: "广州",
    storeId: "yh-liying",
    time: "09:40",
    action: "历史门店进入",
  },
];

export function getStore(id: string): Store {
  const store = STORES.find((item) => item.id === id);
  if (!store) throw new Error(`Unknown store: ${id}`);
  return store;
}
