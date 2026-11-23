// Firebase 설정 — Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹)에서 복사한 값
export const firebaseConfig = {
  apiKey: "AIzaSyDkABMI2pHr9licDz-wIgaeaL9z3Zzdkw0",
  authDomain: "instructor-apply.firebaseapp.com",
  projectId: "instructor-apply",
  storageBucket: "instructor-apply.firebasestorage.app",
  messagingSenderId: "301441269038",
  appId: "1:301441269038:web:2be9b24c9cd88c41ac4ebf"
};

// 관리자 계정 (firestore.rules 의 이메일과 같아야 함)
export const ADMIN_EMAIL = "gritbangjihye@gmail.com";

export const SITE_NAME = "그릿마인드랩 강사 모집";
export const CONTACT = "그릿마인드랩 | 서울시 관악구 인헌12길 46-2 상가동 302호";

export const FIELDS = ["취업·진로", "자소서·면접", "NCS·인적성", "직업기초능력", "리더십·소통", "기업교육·HRD", "코칭·상담", "디지털·AI", "기타"];

export const SESSION_MODES = { offline: "오프라인", online: "온라인", hybrid: "온·오프라인" };
export const FEE_TYPES = { hour: "시간당", session: "회당", total: "총액", nego: "협의" };

export function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
export function nl2br(s) { return esc(s).replace(/\n/g, "<br>"); }

export function feeText(l) {
  if (l.feeType === "nego") return "협의" + (l.feeNote ? ` (${l.feeNote})` : "");
  const amt = Number(l.feeAmount || 0).toLocaleString("ko-KR");
  return `${FEE_TYPES[l.feeType] || ""} ${amt}원` + (l.feeNote ? ` (${l.feeNote})` : "");
}

const WD = ["일", "월", "화", "수", "목", "금", "토"];
export function fmtDate(d) {
  if (!d) return "";
  const t = new Date(d + "T00:00:00");
  if (isNaN(t)) return d;
  return `${t.getFullYear()}.${String(t.getMonth() + 1).padStart(2, "0")}.${String(t.getDate()).padStart(2, "0")}(${WD[t.getDay()]})`;
}
export function scheduleText(l) {
  let s = fmtDate(l.dateStart);
  if (l.dateEnd && l.dateEnd !== l.dateStart) s += " ~ " + fmtDate(l.dateEnd);
  if (l.timeText) s += " " + l.timeText;
  return s || "일정 협의";
}
export function dday(deadline) {
  if (!deadline) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const d = new Date(deadline + "T00:00:00");
  return Math.round((d - today) / 86400000);
}
export function isOpen(l) {
  if (l.status !== "open") return false;
  const dd = dday(l.deadline);
  return dd === null || dd >= 0;
}
