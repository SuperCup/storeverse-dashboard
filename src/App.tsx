import { useCallback, useState } from "react";
import { DEMO_STORE_ID, INITIAL_HISTORY_IDS, getStore } from "./data/stores";
import { PhoneFrame, StatusBar } from "./components/PhoneFrame";
import { CameraCapture } from "./screens/CameraCapture";
import { DsrHome } from "./screens/DsrHome";
import { GuideHome } from "./screens/GuideHome";
import { RoleSelect } from "./screens/RoleSelect";
import { SearchStore } from "./screens/SearchStore";
import { AdviceResult, HqHome, StoreBoard } from "./screens/StoreBoard";
import type { AdviceReport, AdviceStatus, Role } from "./types";

type Screen =
  | { name: "role" }
  | { name: "dsr-home" }
  | { name: "camera" }
  | { name: "search" }
  | { name: "store"; storeId: string }
  | { name: "advice"; storeId: string; reportId: string }
  | { name: "guide-home" }
  | { name: "hq-home" };

function nowLabel() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "role" });
  const [role, setRole] = useState<Role | null>(null);
  const [historyIds, setHistoryIds] = useState<string[]>(INITIAL_HISTORY_IDS);
  const [reports, setReports] = useState<AdviceReport[]>([]);
  const [generating, setGenerating] = useState(false);

  const goRole = (next: Role) => {
    setRole(next);
    if (next === "dsr") setScreen({ name: "dsr-home" });
    else if (next === "hq") setScreen({ name: "hq-home" });
    else setScreen({ name: "guide-home" });
  };

  const rememberStore = (id: string) => {
    setHistoryIds((prev) => (prev.includes(id) ? prev : [id, ...prev]));
  };

  const onRecognized = useCallback(() => {
    rememberStore(DEMO_STORE_ID);
    setScreen({ name: "store", storeId: DEMO_STORE_ID });
  }, []);

  const openStore = (id: string) => {
    rememberStore(id);
    setScreen({ name: "store", storeId: id });
  };

  const generate = (storeId: string) => {
    const store = getStore(storeId);
    const id = `r-${Date.now()}`;
    const statuses = Object.fromEntries(store.advices.map((item) => [item.id, "pending"])) as Record<
      string,
      AdviceStatus
    >;
    const report: AdviceReport = { id, storeId, createdAt: nowLabel(), statuses };
    setReports((prev) => [report, ...prev]);
    setGenerating(true);
    setScreen({ name: "advice", storeId, reportId: id });
    window.setTimeout(() => setGenerating(false), 2200);
  };

  const setAdviceStatus = (reportId: string, adviceId: string, status: "adopted" | "ignored") => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === reportId
          ? { ...report, statuses: { ...report.statuses, [adviceId]: status } }
          : report,
      ),
    );
  };

  const backFromStore = () => {
    if (role === "hq") setScreen({ name: "hq-home" });
    else if (role === "guide") setScreen({ name: "guide-home" });
    else setScreen({ name: "dsr-home" });
  };

  const currentReport =
    screen.name === "advice" ? reports.find((item) => item.id === screen.reportId) : undefined;

  return (
    <PhoneFrame>
      <StatusBar />
      {screen.name === "role" && <RoleSelect onPick={goRole} />}
      {screen.name === "dsr-home" && (
        <DsrHome
          historyIds={historyIds}
          onCapture={() => setScreen({ name: "camera" })}
          onSearch={() => setScreen({ name: "search" })}
          onOpenStore={openStore}
          onSwitchRole={() => setScreen({ name: "role" })}
        />
      )}
      {screen.name === "camera" && (
        <CameraCapture onBack={() => setScreen({ name: "dsr-home" })} onRecognized={onRecognized} />
      )}
      {screen.name === "search" && (
        <SearchStore onBack={() => setScreen({ name: "dsr-home" })} onOpenStore={openStore} />
      )}
      {screen.name === "store" && (
        <StoreBoard
          store={getStore(screen.storeId)}
          reports={reports}
          onBack={backFromStore}
          onGenerate={() => generate(screen.storeId)}
          onOpenReport={(reportId) => {
            setGenerating(false);
            setScreen({ name: "advice", storeId: screen.storeId, reportId });
          }}
        />
      )}
      {screen.name === "advice" && currentReport && (
        <AdviceResult
          store={getStore(screen.storeId)}
          report={currentReport}
          generating={generating}
          onBack={() => setScreen({ name: "store", storeId: screen.storeId })}
          onSetStatus={(adviceId, status) => setAdviceStatus(currentReport.id, adviceId, status)}
        />
      )}
      {screen.name === "hq-home" && (
        <HqHome
          reports={reports}
          historyIds={historyIds}
          onSwitchRole={() => setScreen({ name: "role" })}
          onOpenStore={openStore}
        />
      )}
      {screen.name === "guide-home" && <GuideHome onSwitchRole={() => setScreen({ name: "role" })} />}
    </PhoneFrame>
  );
}
