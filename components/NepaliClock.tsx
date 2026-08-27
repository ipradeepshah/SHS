"use client";
import { useEffect, useState } from "react";
import NepaliDateModule from "nepali-date-converter";
const NepaliDate = typeof NepaliDateModule === "function" ? NepaliDateModule : (NepaliDateModule as { default: unknown }).default as typeof NepaliDateModule;

// Nepal Standard Time offset from UTC: +5:45
const NPT_OFFSET_MIN = 5 * 60 + 45;

console.log("NepaliDate from import:", typeof NepaliDate); export default function NepaliClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Avoid SSR/client mismatch — render nothing until mounted
  if (!now) return <span style={{ opacity: 0 }}>—</span>;

  // Convert to Nepal Standard Time (UTC+5:45)
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const nptDate = new Date(utcMs + NPT_OFFSET_MIN * 60000);

  const timeStr = nptDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // BS date in Nepali script
  const bsDate = new NepaliDate(now);
  const bsStr = bsDate.format("ddd, DD MMMM YYYY", "np");

  return (
    <span style={{ whiteSpace: "nowrap" }}>
      🗓️ {bsStr} (वि.सं.) &nbsp;·&nbsp; 🕐 {timeStr} NPT
    </span>
  );
}
