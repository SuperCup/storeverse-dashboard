import type { HqVisit, SalesSlice, Store, TimeRange } from "../types";

export const TIME_RANGES: { id: TimeRange; label: string }[] = [
  { id: "d1", label: "昨天" },
  { id: "d7", label: "近 7 天" },
  { id: "d30", label: "近 30 天" },
];

export const ADVICE_KIND_LABEL: Record<string, string> = {
  supply: "供给",
  mechanism: "机制",
  price: "价格",
  season: "季节",
};

function slice(
  platforms: SalesSlice["platforms"],
  topSkus: SalesSlice["topSkus"],
  mechanisms: SalesSlice["mechanisms"],
): SalesSlice {
  return { platforms, topSkus, mechanisms };
}

/** 样例来源：docs/sample-data/永辉门店标签_*.csv + 字段说明。近 30 天为实数口径，昨/7天按峰值比例推算便于演示切换。 */
export const STORES: Store[] = [
  {
    id: "yh-nanan-wanda",
    sgStoreId: "36575",
    name: "永辉超市(南岸万达广场店)",
    retailer: "永辉超市",
    businessType: "大型商超",
    province: "重庆",
    city: "重庆",
    district: "南岸区",
    address: "江南大道8号万达广场AB区UG层",
    tags: ["CBD 核心", "地铁紧邻", "高校", "景区", "成熟社区"],
    platformsCovered: ["到家-淘宝闪购"],
    peakWeekday: "下午 14:00-17:59",
    peakWeekend: "下午 14:00-17:59",
    dataDate: "2026-08-31",
    brands: ["嘉士伯", "海天", "景兴", "康师傅", "伊利低温", "舒客"],
    roiHome: "5.87",
    aovHome: "¥21.06",
    skuSupply: "294",
    bestMechHome: "商品满减券",
    nearby: "CBD 核心 · 地铁紧邻 · 高校 · 景区",
    nearbyDetail: "周边画像：CBD 核心、地铁紧邻，兼有高校与景区客流。",
    pois: [
      { kind: "商圈", name: "南岸万达广场", distance: "店内" },
      { kind: "地铁", name: "地铁紧邻", distance: "已覆盖" },
      { kind: "高校", name: "周边高校", distance: "已覆盖" },
      { kind: "景区", name: "周边景区", distance: "已覆盖" },
      { kind: "社区", name: "成熟社区", distance: "已覆盖" },
      { kind: "医院", name: "周边医疗", distance: "已覆盖" },
    ],
    slices: {
      d30: slice(
        [
          {
            id: "elm",
            name: "淘宝闪购",
            capability: true,
            orders: "有活动订单",
            gmv: "到家在投",
            subsidy: "ROI 5.87",
            note: "近 90 天到家能力标签为「是」，本店覆盖平台数 1",
          },
          {
            id: "jd",
            name: "京东秒送",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
            note: "近 90 天到家能力标签为「否」",
          },
          {
            id: "mt",
            name: "美团闪购",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
            note: "近 90 天到家能力标签为「否」",
          },
        ],
        [
          {
            rank: 1,
            name: "商品名未回传",
            sku: "销售额 TOP",
            upc: "6921336821319",
            sales: "近 30 天 ¥139.80",
            note: "供给表未提供该 69 码的商品名称",
          },
          {
            rank: 2,
            name: "abc纤薄棉柔表层日用240mm卫生巾12片/包",
            sku: "销量 TOP",
            upc: "6923567600497",
            sales: "近 30 天件次最高",
          },
        ],
        [
          {
            name: "商品满减券",
            gmvShare: "到家最优机制",
            subsidyShare: "ROI 5.87",
            days: "近 30 天 · 高峰下午 14:00-17:59",
            status: "good",
            note: "本店到店订单标签为「否」、到家订单为「是」，到店 ROI 无值，属于纯到家门店。",
          },
        ],
      ),
      d7: slice(
        [
          {
            id: "elm",
            name: "淘宝闪购",
            capability: true,
            orders: "周活跃",
            gmv: "周峰值在下午档",
            subsidy: "ROI 约 5.9",
            note: "由近 30 天实数按高峰推算",
          },
          {
            id: "jd",
            name: "京东秒送",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
          {
            id: "mt",
            name: "美团闪购",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
        ],
        [
          {
            rank: 1,
            name: "abc纤薄棉柔表层日用240mm卫生巾12片/包",
            sku: "销量 TOP",
            upc: "6923567600497",
            sales: "周动销靠前",
          },
        ],
        [
          {
            name: "商品满减券",
            gmvShare: "到家最优",
            subsidyShare: "ROI 健康",
            days: "近 7 天仍在投",
            status: "good",
            note: "高频品牌：嘉士伯、海天、康师傅、伊利低温",
          },
        ],
      ),
      d1: slice(
        [
          {
            id: "elm",
            name: "淘宝闪购",
            capability: true,
            orders: "昨日有单",
            gmv: "笔单价参考 ¥21.06",
            subsidy: "满减承接",
            note: "工作日/周末高峰均为下午 14:00-17:59",
          },
          {
            id: "jd",
            name: "京东秒送",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
          {
            id: "mt",
            name: "美团闪购",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
        ],
        [
          {
            rank: 1,
            name: "abc 纤薄棉柔日用 240mm 卫生巾 12 片",
            sku: "销量 TOP",
            upc: "6923567600497",
            sales: "昨日仍有动销",
          },
        ],
        [
          {
            name: "商品满减券",
            gmvShare: "主机制",
            subsidyShare: "ROI 5.87",
            days: "昨日在投",
            status: "good",
            note: "单平台店，不要假装有微信到店券核销",
          },
        ],
      ),
    },
    advices: [
      {
        id: "a1",
        kind: "mechanism",
        title: "保住淘宝闪购「商品满减券」，别盲目加第二平台预算",
        chain: "供给有货 → 动销成立 → 机制对 → 先看 ROI",
        reason: "该店覆盖平台仅「到家-淘宝闪购」，近 30 天到家最优机制为商品满减券，ROI 5.87，且没有到店订单。",
        instruction: "采纳后上报总部：本店继续以淘宝闪购满减为主，京东/美团本期不扩。",
        hqHint: "可纳入南岸万达单平台深耕计划",
      },
      {
        id: "a2",
        kind: "season",
        title: "CBD+高校客群：下午档加码，不要按社区囤货逻辑备周末",
        chain: "POI标签 × 高峰时段 → 调整供给与档期",
        reason: "周边标签命中 CBD 核心、地铁、高校与景区；工作日与周末高峰均为下午 14:00-17:59。",
        instruction: "把满减曝光和拣货人力压到下午档；周末不必按家庭囤货店加纸品。",
        hqHint: "可配置下午档城市机制",
      },
      {
        id: "a3",
        kind: "supply",
        title: "盯住销量 TOP 卫生巾与销售额 TOP 69码，避免空销",
        chain: "先看供给 → 再谈机制",
        reason: "销量最高：abc 纤薄棉柔日用卫生巾（69码 6923567600497）；销售额最高：69码 6921336821319，供给表未回传商品名。在售 SKU 294。",
        instruction: "到店核对这两款是否断货；采纳记入供给巡检，不直连门店后台下单。",
        hqHint: "进入门店供给巡检清单",
      },
      {
        id: "a4",
        kind: "mechanism",
        title: "高频品牌以海天/康师傅/伊利低温为主推，勿散打",
        chain: "动销品牌 TOP → 机制投放聚焦",
        reason: "近 90 天高频活动品牌：嘉士伯、海天、景兴、康师傅、伊利低温、舒客。",
        instruction: "满减券优先绑这些品牌货盘；忽略无动销长尾品。",
        hqHint: "品牌货盘与机制绑定",
      },
    ],
    yesterdaySales: "¥4,860",
    yesterdayDelta: "笔单价参考 ¥21.06",
    weekTrend: [16, 18, 17, 19, 21, 20, 22],
    hotSkus: [
      { rank: 1, name: "abc 纤薄棉柔日用 240mm 卫生巾", sku: "6923567600497", sales: "近 30 天件次最高", lift: "销量 TOP" },
      { rank: 2, name: "商品名未回传", sku: "6921336821319", sales: "近 30 天 ¥139.80", lift: "销售额 TOP" },
    ],
    campaign: {
      name: "淘宝闪购 · 商品满减券",
      tag: "到家最优机制",
      effect: "到家 ROI 5.87 · 笔单价 ¥21.06",
      vsPlan: "单平台店，满减为唯一主机制",
      hint: "到店能力标签均为否，不要推荐微信支付到店券。",
    },
    opportunity: {
      headline: "下午档满减深挖",
      line: "单平台淘宝闪购 · 到家 ROI 5.87 · 工作日与周末高峰同为 14:00-17:59",
    },
    guidePushes: [
      {
        id: "g1",
        sku: "6923567600497",
        name: "abc纤薄棉柔表层日用卫生巾",
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
    peakWeekday: "下午 14:00-17:59",
    peakWeekend: "晚间 18:00-22:59",
    dataDate: "2026-08-31",
    brands: ["太粮米业", "伊利奶粉", "康师傅", "海天", "妙可蓝多", "景兴", "伊利低温", "舒客", "嘉士伯", "蒙牛冰品"],
    roiHome: "8.15",
    aovHome: "¥33.80",
    skuSupply: "338",
    bestMechHome: "商品满减券",
    nearby: "商圈 · 成熟社区 · CBD · 地铁 · 学校",
    nearbyDetail: "周边画像：黄沙商圈叠加成熟社区与学校，到家 ROI 高于同批样例中位数。",
    pois: [
      { kind: "商圈", name: "西城都荟 / 黄沙", distance: "店内" },
      { kind: "地铁", name: "地铁覆盖", distance: "已覆盖" },
      { kind: "学校", name: "周边学校", distance: "已覆盖" },
      { kind: "社区", name: "成熟社区", distance: "已覆盖" },
      { kind: "CBD", name: "CBD", distance: "已覆盖" },
    ],
    slices: {
      d30: slice(
        [
          {
            id: "elm",
            name: "淘宝闪购",
            capability: true,
            orders: "有活动订单",
            gmv: "到家在投",
            subsidy: "ROI 8.15",
            note: "笔单价 ¥33.80 · 在售 SKU 338",
          },
          {
            id: "jd",
            name: "京东秒送",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
          {
            id: "mt",
            name: "美团闪购",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
        ],
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
            name: "ABC K53亲柔立围棉柔迷你卫生巾8片[8片]",
            sku: "销量 TOP",
            upc: "6922731882516",
            sales: "近 30 天件次最高",
          },
        ],
        [
          {
            name: "商品满减券",
            gmvShare: "到家最优机制",
            subsidyShare: "ROI 8.15",
            days: "工作日下午 · 周末晚高峰",
            status: "good",
            note: "同批样例中 ROI 偏高，机制健康，优先扩量而非停投。",
          },
        ],
      ),
      d7: slice(
        [
          {
            id: "elm",
            name: "淘宝闪购",
            capability: true,
            orders: "周活跃",
            gmv: "周末晚高峰更高",
            subsidy: "ROI 高位",
          },
          { id: "jd", name: "京东秒送", capability: false, orders: "—", gmv: "—", subsidy: "—" },
          { id: "mt", name: "美团闪购", capability: false, orders: "—", gmv: "—", subsidy: "—" },
        ],
        [
          {
            rank: 1,
            name: "ABC K53亲柔立围棉柔迷你卫生巾8片",
            sku: "销量 TOP",
            upc: "6922731882516",
            sales: "周动销靠前",
          },
        ],
        [
          {
            name: "商品满减券",
            gmvShare: "主机制",
            subsidyShare: "ROI 8.15",
            days: "近 7 天",
            status: "good",
            note: "品牌面宽：太粮/伊利/康师傅/海天等 TOP10 齐全",
          },
        ],
      ),
      d1: slice(
        [
          {
            id: "elm",
            name: "淘宝闪购",
            capability: true,
            orders: "昨日有单",
            gmv: "笔单价参考 ¥33.80",
            subsidy: "满减",
          },
          { id: "jd", name: "京东秒送", capability: false, orders: "—", gmv: "—", subsidy: "—" },
          { id: "mt", name: "美团闪购", capability: false, orders: "—", gmv: "—", subsidy: "—" },
        ],
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
            name: "商品满减券",
            gmvShare: "主机制",
            subsidyShare: "ROI 优",
            days: "昨日",
            status: "good",
            note: "周末高峰转晚间 18:00-22:59，与工作日下午不同",
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
        reason: "到家 ROI 8.15，高于南岸万达 5.87；最优机制仍是商品满减券；在售 SKU 338。",
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
        name: "ABC K53迷你卫生巾",
        coupon: "淘宝闪购满减",
        script: "这是销量最高款，走闪购满减。",
        reason: "销量 TOP × ROI 8.15",
      },
    ],
  },
  {
    id: "yh-xiaozhai",
    sgStoreId: "32788",
    name: "永辉超市(小寨西路店)",
    retailer: "永辉超市",
    businessType: "大型商超",
    province: "陕西",
    city: "西安",
    district: "雁塔区",
    address: "小寨西路232号MOMOPARK负1层",
    tags: ["商圈", "成熟社区", "CBD", "地铁", "学校"],
    platformsCovered: ["到家-京东秒送"],
    peakWeekday: "晚间 18:00-22:59",
    peakWeekend: "晚间 18:00-22:59",
    dataDate: "2026-08-31",
    brands: ["海天", "伊利奶粉", "伊利低温", "太粮米业", "康师傅", "嘉士伯", "妙可蓝多", "景兴"],
    roiHome: "6.84",
    aovHome: "¥19.74",
    skuSupply: "—",
    bestMechHome: "优惠券",
    nearby: "商圈 · 成熟社区 · CBD · 地铁 · 学校",
    nearbyDetail: "周边画像：小寨商圈 MOMOPARK，地铁与学校叠加，主平台为京东秒送。",
    pois: [
      { kind: "商圈", name: "小寨 / MOMOPARK", distance: "店内" },
      { kind: "地铁", name: "地铁覆盖", distance: "已覆盖" },
      { kind: "学校", name: "周边学校/高校", distance: "已覆盖" },
      { kind: "社区", name: "成熟社区", distance: "已覆盖" },
    ],
    slices: {
      d30: slice(
        [
          {
            id: "jd",
            name: "京东秒送",
            capability: true,
            orders: "有活动订单",
            gmv: "到家在投",
            subsidy: "ROI 6.84",
            note: "本店覆盖平台列表仅「到家-京东」",
          },
          {
            id: "elm",
            name: "淘宝闪购",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
          {
            id: "mt",
            name: "美团闪购",
            capability: false,
            orders: "—",
            gmv: "—",
            subsidy: "—",
          },
        ],
        [
          {
            rank: 1,
            name: "海天永辉定制&油趣工坊有机山茶油1L",
            sku: "销售额 TOP",
            upc: "6977168342348",
            sales: "¥178.00",
          },
          {
            rank: 2,
            name: "金典鲜牛奶450ml",
            sku: "销量 TOP",
            upc: "6907992106601",
            sales: "近 30 天件次最高",
          },
        ],
        [
          {
            name: "优惠券",
            gmvShare: "到家最优机制",
            subsidyShare: "ROI 6.84",
            days: "工作日/周末均为晚间 18:00-22:59",
            status: "good",
            note: "与万达店「商品满减券」不同，本店京东侧最优是优惠券。",
          },
        ],
      ),
      d7: slice(
        [
          {
            id: "jd",
            name: "京东秒送",
            capability: true,
            orders: "晚高峰集中",
            gmv: "周活跃",
            subsidy: "ROI 约 6.8",
          },
          { id: "elm", name: "淘宝闪购", capability: false, orders: "—", gmv: "—", subsidy: "—" },
          { id: "mt", name: "美团闪购", capability: false, orders: "—", gmv: "—", subsidy: "—" },
        ],
        [
          {
            rank: 1,
            name: "金典鲜牛奶450ml",
            sku: "销量 TOP",
            upc: "6907992106601",
            sales: "晚高峰动销",
          },
        ],
        [
          {
            name: "优惠券",
            gmvShare: "主机制",
            subsidyShare: "ROI 6.84",
            days: "近 7 天",
            status: "good",
            note: "品牌：海天、伊利、太粮、康师傅等",
          },
        ],
      ),
      d1: slice(
        [
          {
            id: "jd",
            name: "京东秒送",
            capability: true,
            orders: "昨日晚高峰",
            gmv: "笔单价参考 ¥19.74",
            subsidy: "优惠券",
          },
          { id: "elm", name: "淘宝闪购", capability: false, orders: "—", gmv: "—", subsidy: "—" },
          { id: "mt", name: "美团闪购", capability: false, orders: "—", gmv: "—", subsidy: "—" },
        ],
        [
          {
            rank: 1,
            name: "海天永辉定制有机山茶油1L",
            sku: "销售额 TOP",
            upc: "6977168342348",
            sales: "¥178.00/30天",
          },
        ],
        [
          {
            name: "优惠券",
            gmvShare: "主机制",
            subsidyShare: "ROI 健康",
            days: "昨日",
            status: "good",
            note: "不要套用淘宝满减话术，本店机制名是优惠券",
          },
        ],
      ),
    },
    advices: [
      {
        id: "c1",
        kind: "mechanism",
        title: "京东「优惠券」继续投，别复制淘宝满减模板",
        chain: "平台能力 → 机制名匹配",
        reason: "该店覆盖平台为「到家-京东」，最优机制是优惠券，到家 ROI 6.84。",
        instruction: "采纳后按京东优惠券申请预算，不把南岸万达的满减策略照搬过来。",
        hqHint: "按平台拆机制模板",
      },
      {
        id: "c2",
        kind: "season",
        title: "小寨晚高峰：18:00-22:59 保障乳品与粮油供给",
        chain: "高峰 × 热销品 → 供给",
        reason: "工作日/周末高峰都是晚间 18:00-22:59；销量 TOP 金典鲜牛奶，销售额 TOP 海天山茶油。",
        instruction: "傍晚前完成乳品与粮油补货沟通；采纳记入晚高峰供给。",
        hqHint: "雁塔小寨晚高峰供给计划",
      },
    ],
    yesterdaySales: "¥5,210",
    yesterdayDelta: "笔单价参考 ¥19.74",
    weekTrend: [18, 17, 19, 20, 22, 24, 23],
    hotSkus: [
      { rank: 1, name: "金典鲜牛奶 450ml", sku: "6907992106601", sales: "近 30 天件次最高", lift: "销量 TOP" },
      { rank: 2, name: "海天永辉定制有机山茶油 1L", sku: "6977168342348", sales: "近 30 天 ¥178.00", lift: "销售额 TOP" },
    ],
    campaign: {
      name: "京东秒送 · 优惠券",
      tag: "到家最优机制",
      effect: "到家 ROI 6.84 · 笔单价 ¥19.74",
      vsPlan: "晚高峰店，券要配乳品粮油",
      hint: "与淘宝满减店策略不同，按平台区分。",
    },
    opportunity: {
      headline: "晚高峰券配乳品粮油",
      line: "京东秒送 · 到家 ROI 6.84 · 工作日与周末高峰同为 18:00-22:59",
    },
    guidePushes: [
      {
        id: "xg1",
        sku: "6907992106601",
        name: "金典鲜牛奶450ml",
        coupon: "京东优惠券",
        script: "晚高峰这款走得最快，有券先推它。",
        reason: "销量 TOP × 晚间 18:00-22:59",
      },
    ],
  },
];

export const DEMO_STORE_ID = "yh-nanan-wanda";
export const GUIDE_BOUND_STORE_ID = "yh-nanan-wanda";
export const INITIAL_HISTORY_IDS = ["yh-xicheng-duhui", "yh-xiaozhai"];

export const HQ_SEED_VISITS: HqVisit[] = [
  {
    dsr: "高宇",
    province: "重庆",
    city: "重庆",
    storeId: "yh-nanan-wanda",
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
    province: "陕西",
    city: "西安",
    storeId: "yh-xiaozhai",
    time: "09:40",
    action: "历史门店进入",
  },
];

export function getStore(id: string): Store {
  const store = STORES.find((item) => item.id === id);
  if (!store) throw new Error(`Unknown store: ${id}`);
  return store;
}
