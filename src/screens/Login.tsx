import { useState } from "react";
import { ACCOUNT } from "../data/account";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [id, setId] = useState(ACCOUNT.loginId);
  const [pwd, setPwd] = useState("demo1234");
  const [submitting, setSubmitting] = useState(false);

  const disabled = !id.trim() || !pwd.trim() || submitting;

  const submit = () => {
    if (disabled) return;
    setSubmitting(true);
    window.setTimeout(onLogin, 600);
  };

  return (
    <div className="screen login">
      <div className="login-main">
        <div className="login-brand">
          <div className="kicker">STOREVERSE OPS AI</div>
          <h1 className="h1" style={{ marginTop: 10 }}>
            门店运营 AI
          </h1>
          <p className="muted" style={{ marginTop: 8 }}>
            用工号登录，进入你负责片区的访店与销售看板。
          </p>
        </div>

        <div className="card login-form">
          <label className="field">
            <span className="field-label">工号</span>
            <input
              className="search-box"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="请输入工号"
              autoComplete="username"
            />
          </label>
          <label className="field">
            <span className="field-label">密码</span>
            <input
              className="search-box"
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="请输入密码"
              autoComplete="current-password"
            />
          </label>
          <button className="gen-btn" style={{ marginTop: 4 }} onClick={submit} disabled={disabled}>
            {submitting ? "登录中…" : "登录"}
          </button>
          <div className="empty-note" style={{ textAlign: "center" }}>
            演示环境已预填工号与密码，直接点登录即可。
          </div>
        </div>
      </div>

      <div className="connect login-foot">演示环境不做真实鉴权，登录信息仅用于展示当前用户的片区数据。</div>
    </div>
  );
}
