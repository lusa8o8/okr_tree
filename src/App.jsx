import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Download,
  GitFork,
  Minus,
  Plus,
  RotateCcw,
  Target,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const STORAGE_KEY = "lusa_2026_speed_run_days_v1";
const SPRINT_CONFIG_STORAGE_KEY = "lusa_2026_sprint_config_v1";
const TRACKING_YEAR = 2026;
const DEFAULT_SPRINT_START_DATE = "2026-05-14";

const focusAreas = [
  { id: "ai", label: "AI Engineering", color: "#2563eb", okrId: "okr-ai" },
  { id: "marketing", label: "Digital Marketing", color: "#16a34a", okrId: "okr-marketing" },
  { id: "startup", label: "Startup Execution", color: "#d97706", okrId: "okr-startup" },
  { id: "brand", label: "Personal Brand", color: "#7c3aed", okrId: "okr-brand" },
];

const referenceTree = {
  id: "root",
  title: "2026 Personal OKR Dashboard",
  type: "root",
  children: [
    {
      id: "mission-vision",
      title: "Mission + Vision",
      type: "branch",
      children: [
        {
          id: "mission",
          title: "Mission",
          type: "note",
          body:
            "Honor God with gifts in AI engineering, digital strategy, and innovation while multiplying entrusted talents for impact, freedom, and kingdom expansion.",
        },
        {
          id: "vision",
          title: "Vision",
          type: "note",
          body:
            "Become financially free, spiritually grounded, and boringly effective as a kingdom entrepreneur whose life, wealth, and influence uplift family, community, and the Church.",
        },
      ],
    },
    {
      id: "priorities",
      title: "2026 Priorities",
      type: "branch",
      children: [
        { id: "priority-ai", title: "AI Engineering", type: "leaf" },
        { id: "priority-marketing", title: "Digital Marketing", type: "leaf" },
        { id: "priority-startup", title: "Startup Launch / Management / Scale", type: "leaf" },
        { id: "priority-brand", title: "Personal Brand", type: "leaf" },
      ],
    },
    {
      id: "master-objective",
      title: "90-Day Master Objective",
      type: "branch",
      body:
        "Become boringly skillful across AI engineering, digital marketing, startup execution, and personal brand building within 90 days.",
      children: [
        {
          id: "okr-ai",
          title: "OKR 1: AI Engineering",
          type: "okr",
          children: [
            {
              id: "objective-ai",
              title: "Objective: Build a practical AI engineering foundation by learning, coding, and shipping small useful tools within 90 days.",
              type: "objective",
            },
            { id: "ai-kr-1", title: "KR 1: Complete 40 focused Python/coding sessions by Day 90", type: "kr", scoringType: "numeric", target: 40, deadlineDay: 90 },
            { id: "ai-kr-2", title: "KR 2: Complete 2 AI/agent courses from DeepLearning.AI or Anthropic Academy by Day 75", type: "kr", scoringType: "numeric", target: 2, deadlineDay: 75 },
            { id: "ai-kr-3", title: "KR 3: Build 3 small AI tools using one lean stack by Day 90", type: "kr", scoringType: "numeric", target: 3, deadlineDay: 90 },
            { id: "ai-kr-4", title: "KR 4: Push 3 AI projects to GitHub with clear READMEs by Day 90", type: "kr", scoringType: "numeric", target: 3, deadlineDay: 90 },
            { id: "ai-kr-5", title: "KR 5: Explain 10 core engineering concepts in your own words by Day 60", type: "kr", scoringType: "numeric", target: 10, deadlineDay: 60 },
          ],
        },
        {
          id: "okr-marketing",
          title: "OKR 2: Digital Marketing",
          type: "okr",
          children: [
            {
              id: "objective-marketing",
              title: "Objective: Become a more effective digital marketer by applying strategy directly to TSH and personal projects within 90 days.",
              type: "objective",
            },
            { id: "marketing-kr-1", title: "KR 1: Complete 2 practical digital marketing learning tracks by Day 75", type: "kr", scoringType: "numeric", target: 2, deadlineDay: 75 },
            { id: "marketing-kr-2", title: "KR 2: Create 3 marketing strategy documents for TSH campaigns or funnels by Day 60", type: "kr", scoringType: "numeric", target: 3, deadlineDay: 60 },
            { id: "marketing-kr-3", title: "KR 3: Run 4 small marketing experiments for TSH or Lusa Works by Day 90", type: "kr", scoringType: "numeric", target: 4, deadlineDay: 90 },
            { id: "marketing-kr-4", title: "KR 4: Improve 1 TSH landing page, campaign, or user journey by Day 70", type: "kr", scoringType: "binary", target: 1, deadlineDay: 70 },
            { id: "marketing-kr-5", title: "KR 5: Publish 4 marketing breakdowns under Lusa Works by Day 90", type: "kr", scoringType: "numeric", target: 4, deadlineDay: 90 },
          ],
        },
        {
          id: "okr-startup",
          title: "OKR 3: Startup Launch / Management / Scale",
          type: "okr",
          children: [
            {
              id: "objective-startup",
              title: "Objective: Develop founder skill by learning startup fundamentals and applying them through real validation work within 90 days.",
              type: "objective",
            },
            { id: "startup-kr-1", title: "KR 1: Complete YC Startup School core material by Day 60", type: "kr", scoringType: "binary", target: 1, deadlineDay: 60 },
            { id: "startup-kr-2", title: "KR 2: Write 3 one-page startup briefs using Problem - Solution - Target User by Day 30", type: "kr", scoringType: "numeric", target: 3, deadlineDay: 30 },
            { id: "startup-kr-3", title: "KR 3: Conduct 20 customer discovery conversations for one selected startup idea by Day 75", type: "kr", scoringType: "numeric", target: 20, deadlineDay: 75 },
            {
              id: "startup-kr-4",
              title: "KR 4: Build or refine 1 MVP/testable prototype by Day 90",
              type: "kr",
              scoringType: "milestone",
              deadlineDay: 90,
              milestones: ["Define scope", "Build prototype", "Test with users", "Publish demo"],
            },
            { id: "startup-kr-5", title: "KR 5: Create 1 startup validation dashboard by Day 45", type: "kr", scoringType: "binary", target: 1, deadlineDay: 45 },
          ],
        },
        {
          id: "okr-brand",
          title: "OKR 4: Personal Brand",
          type: "okr",
          children: [
            {
              id: "objective-brand",
              title: "Objective: Build Lusa Works into visible proof of learning, building, and disciplined execution within 90 days.",
              type: "objective",
            },
            { id: "brand-kr-1", title: "KR 1: Publish 24 useful posts by Day 90", type: "kr", scoringType: "numeric", target: 24, deadlineDay: 90 },
            { id: "brand-kr-2", title: "KR 2: Publish 6 learning logs about AI engineering, marketing, or startup execution by Day 90", type: "kr", scoringType: "numeric", target: 6, deadlineDay: 90 },
            { id: "brand-kr-3", title: "KR 3: Publish 3 mini case studies from real projects by Day 90", type: "kr", scoringType: "numeric", target: 3, deadlineDay: 90 },
            { id: "brand-kr-4", title: "KR 4: Grow by 300 relevant followers or connections by Day 90", type: "kr", scoringType: "numeric", target: 300, deadlineDay: 90 },
            { id: "brand-kr-5", title: "KR 5: Generate 10 meaningful conversations from builders, founders, marketers, or collaborators by Day 90", type: "kr", scoringType: "numeric", target: 10, deadlineDay: 90 },
          ],
        },
      ],
    },
    {
      id: "omissions",
      title: "Omitted for 2026",
      type: "branch",
      children: [
        { id: "omit-trading", title: "Trading", type: "leaf" },
        { id: "omit-random", title: "Random app ideas", type: "leaf" },
        { id: "omit-courses", title: "Unfocused courses", type: "leaf" },
        { id: "omit-experiments", title: "Nonessential experiments", type: "leaf" },
      ],
    },
  ],
};

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fromDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(key, options = {}) {
  return fromDateKey(key).toLocaleDateString(undefined, {
    weekday: options.weekday || "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function buildHeatmapWeeks(year) {
  const firstDay = new Date(year, 0, 1);
  const lastDay = new Date(year, 11, 31);
  const weeks = [];
  let week = Array(firstDay.getDay()).fill(null);
  let cursor = new Date(firstDay);

  while (cursor <= lastDay) {
    week.push(toDateKey(cursor));

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  if (week.length) {
    weeks.push([...week, ...Array(7 - week.length).fill(null)]);
  }

  return weeks;
}

function buildMonthHeatmaps(year) {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const weeks = [];
    let week = Array(firstDay.getDay()).fill(null);
    let cursor = new Date(firstDay);

    while (cursor <= lastDay) {
      week.push(toDateKey(cursor));

      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    if (week.length) {
      weeks.push([...week, ...Array(7 - week.length).fill(null)]);
    }

    return {
      month: firstDay.toLocaleDateString(undefined, { month: "short" }),
      weeks,
    };
  });
}

function defaultEntry(dateKey) {
  return {
    date: dateKey,
    actionDay: false,
    focuses: ["ai"],
    intensity: 1,
    krProgress: {},
    notes: "",
  };
}

function getEntry(entries, dateKey) {
  const savedEntry = entries[dateKey];
  if (!savedEntry) return defaultEntry(dateKey);

  return {
    ...defaultEntry(dateKey),
    ...savedEntry,
    focuses: Array.isArray(savedEntry.focuses)
      ? savedEntry.focuses
      : savedEntry.focus
        ? [savedEntry.focus]
        : ["ai"],
  };
}

function entryLevel(entry) {
  if (!entry?.actionDay) return 0;
  const hasNotes = entry.notes?.trim().length > 0;
  const focusCount = Array.isArray(entry.focuses) ? entry.focuses.length : entry.focus ? 1 : 0;
  return Math.max(1, Math.min(4, Number(entry.intensity || 1) + Math.max(0, focusCount - 1) + (hasNotes ? 1 : 0)));
}

function getHeatColor(entry, isOutsideYear = false) {
  if (isOutsideYear) return "#f8fafc";
  const level = entryLevel(entry);
  return ["#ebedf0", "#bbf7d0", "#86efac", "#22c55e", "#15803d"][level];
}

function clamp01(value) {
  return Math.max(0, Math.min(1, Number(value) || 0));
}

function getTrackingDay(sprintStartDate) {
  const today = new Date();
  const start = fromDateKey(sprintStartDate || DEFAULT_SPRINT_START_DATE);
  const diff = Math.floor((today - start) / 86400000) + 1;
  return Math.max(1, diff);
}

function flattenKrs(node, result = []) {
  if (node.type === "kr") result.push(node);
  node.children?.forEach((child) => flattenKrs(child, result));
  return result;
}

function flattenOkrs(node, result = []) {
  if (node.type === "okr") result.push(node);
  node.children?.forEach((child) => flattenOkrs(child, result));
  return result;
}

function getKrState(progress, kr) {
  return progress[kr.id] || { current: 0, complete: false, milestones: {} };
}

function getKrScore(kr, progress) {
  const state = getKrState(progress, kr);

  if (kr.scoringType === "binary") {
    return state.complete ? 1 : 0;
  }

  if (kr.scoringType === "milestone") {
    const total = kr.milestones?.length || 1;
    const completed = kr.milestones?.filter((step) => state.milestones?.[step]).length || 0;
    return clamp01(completed / total);
  }

  return clamp01(Number(state.current || 0) / Number(kr.target || 1));
}

function getExpectedScore(kr, sprintStartDate) {
  const deadline = Number(kr.deadlineDay || 90);
  return clamp01(getTrackingDay(sprintStartDate) / deadline);
}

function getStatus(kr, progress, sprintStartDate) {
  const score = getKrScore(kr, progress);
  const expected = getExpectedScore(kr, sprintStartDate);
  const delta = score - expected;

  if (score >= 1) return { label: "Complete", className: "bg-emerald-50 text-emerald-800 border-emerald-200" };
  if (delta >= 0.1) return { label: "Ahead", className: "bg-blue-50 text-blue-800 border-blue-200" };
  if (delta <= -0.25) return { label: "At Risk", className: "bg-red-50 text-red-800 border-red-200" };
  if (delta <= -0.1) return { label: "Behind", className: "bg-amber-50 text-amber-800 border-amber-200" };
  return { label: "On Track", className: "bg-slate-50 text-slate-800 border-slate-200" };
}

function getObjectiveScore(okr, progress) {
  const krs = flattenKrs(okr);
  if (!krs.length) return 0;
  return krs.reduce((sum, kr) => sum + getKrScore(kr, progress), 0) / krs.length;
}

function getOverallScore(progress) {
  const okrs = flattenOkrs(referenceTree);
  if (!okrs.length) return 0;
  return okrs.reduce((sum, okr) => sum + getObjectiveScore(okr, progress), 0) / okrs.length;
}

function getKrsForFocuses(focuses) {
  const selectedOkrIds = focusAreas.filter((area) => focuses.includes(area.id)).map((area) => area.okrId);
  return flattenOkrs(referenceTree)
    .filter((okr) => selectedOkrIds.includes(okr.id))
    .flatMap((okr) => flattenKrs(okr));
}

function aggregateKrProgress(entries) {
  const progress = {};

  Object.values(entries).forEach((entry) => {
    Object.entries(entry.krProgress || {}).forEach(([krId, log]) => {
      const current = progress[krId] || { current: 0, complete: false, milestones: {} };
      const nextMilestones = { ...current.milestones };
      Object.entries(log.milestones || {}).forEach(([step, complete]) => {
        if (complete) nextMilestones[step] = true;
      });

      progress[krId] = {
        current: Number(current.current || 0) + Number(log.amount || 0),
        complete: Boolean(current.complete || log.complete),
        milestones: nextMilestones,
      };
    });
  });

  return progress;
}

function formatScore(score) {
  return clamp01(score).toFixed(2);
}

function formatPercent(score) {
  return `${Math.round(clamp01(score) * 100)}%`;
}

function downloadJson(entries, sprintStartDate) {
  const data = JSON.stringify({ year: TRACKING_YEAR, sprintStartDate, entries, okrProgress: aggregateKrProgress(entries) }, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "lusa-2026-speed-run-days.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

function FocusDot({ focus }) {
  const area = focusAreas.find((item) => item.id === focus) || focusAreas[0];
  return <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: area.color }} />;
}

function Heatmap({ weeks, entries, selectedDate, todayKey, onSelectDate }) {
  const months = useMemo(() => buildMonthHeatmaps(TRACKING_YEAR), []);
  const monthLabels = weeks.map((week, index) => {
    const firstDate = week.find(Boolean);
    if (!firstDate) return "";
    const date = fromDateKey(firstDate);
    const previousDate = index > 0 ? weeks[index - 1].find(Boolean) : null;
    const previousMonth = previousDate ? fromDateKey(previousDate).getMonth() : -1;
    return date.getMonth() !== previousMonth ? date.toLocaleDateString(undefined, { month: "short" }) : "";
  });

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {months.map((month) => (
          <div key={month.month} className="min-w-0">
            <div className="mb-2 text-xs font-medium text-slate-700">{month.month}</div>
            <div className="flex gap-1">
              {month.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-1">
                  {week.map((dateKey, dayIndex) => {
                    const entry = dateKey ? entries[dateKey] : null;
                    const isSelected = dateKey === selectedDate;
                    const isToday = dateKey === todayKey;

                    return (
                      <button
                        key={dateKey || `${month.month}-${weekIndex}-${dayIndex}`}
                        type="button"
                        disabled={!dateKey}
                        aria-label={dateKey ? `${formatDate(dateKey)}${entry?.actionDay ? ", action day" : ""}` : "Empty day"}
                        title={dateKey ? `${formatDate(dateKey)}${entry?.notes ? ` - ${entry.notes}` : ""}` : ""}
                        onClick={() => dateKey && onSelectDate(dateKey)}
                        className={[
                          "h-3 w-3 rounded-[3px] border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                          isSelected ? "border-slate-950 ring-2 ring-slate-950 ring-offset-1" : "border-transparent",
                          isToday && !isSelected ? "ring-1 ring-slate-500 ring-offset-1" : "",
                        ].join(" ")}
                        style={{ backgroundColor: getHeatColor(entry, !dateKey) }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="hidden sm:block"
        style={{
          "--heat-cell": "clamp(8px, calc((100vw - 176px) / 53), 16px)",
          "--heat-gap": "clamp(2px, 0.35vw, 4px)",
        }}
      >
        <div className="mb-3 grid grid-cols-[34px_1fr] gap-2 text-xs text-slate-600">
          <div />
          <div className="flex gap-[var(--heat-gap)]">
            {monthLabels.map((label, index) => (
              <div key={`${label}-${index}`} className="shrink-0 overflow-visible" style={{ width: "var(--heat-cell)" }}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-2">
          <div className="grid grid-rows-7 gap-[var(--heat-gap)] text-xs text-slate-500">
            <span />
            <span>Mon</span>
            <span />
            <span>Wed</span>
            <span />
            <span>Fri</span>
            <span />
          </div>
          <div className="min-w-0 pb-2">
            <div className="flex max-w-full gap-[var(--heat-gap)]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-rows-7 gap-[var(--heat-gap)]">
                  {week.map((dateKey, dayIndex) => {
                    const entry = dateKey ? entries[dateKey] : null;
                    const isSelected = dateKey === selectedDate;
                    const isToday = dateKey === todayKey;

                    return (
                      <button
                        key={dateKey || `${weekIndex}-${dayIndex}`}
                        type="button"
                        disabled={!dateKey}
                        aria-label={dateKey ? `${formatDate(dateKey)}${entry?.actionDay ? ", action day" : ""}` : "Empty day"}
                        title={dateKey ? `${formatDate(dateKey)}${entry?.notes ? ` - ${entry.notes}` : ""}` : ""}
                        onClick={() => dateKey && onSelectDate(dateKey)}
                        className={[
                          "rounded-[3px] border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                          isSelected ? "border-slate-950 ring-2 ring-slate-950 ring-offset-1" : "border-transparent",
                          isToday && !isSelected ? "ring-1 ring-slate-500 ring-offset-1" : "",
                        ].join(" ")}
                        style={{ width: "var(--heat-cell)", height: "var(--heat-cell)", backgroundColor: getHeatColor(entry, !dateKey) }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <span key={level} className="h-3.5 w-3.5 rounded-[3px]" style={{ backgroundColor: ["#ebedf0", "#bbf7d0", "#86efac", "#22c55e", "#15803d"][level] }} />
          ))}
          <span>More</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-[3px] ring-1 ring-slate-500 ring-offset-1" style={{ backgroundColor: "#ebedf0" }} />
          Today
        </div>
      </div>
    </div>
  );
}

function DayKrLogger({ kr, entry, onChange }) {
  const krProgress = entry.krProgress || {};
  const log = krProgress[kr.id] || { amount: 0, complete: false, milestones: {} };
  const updateLog = (patch) => {
    onChange({
      actionDay: true,
      krProgress: {
        ...krProgress,
        [kr.id]: {
          ...log,
          ...patch,
        },
      },
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium leading-5 text-slate-900">{kr.title}</span>
        <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-600">
          {kr.scoringType}
        </span>
      </div>

      {kr.scoringType === "numeric" && (
        <div className="mt-3 flex items-center gap-2">
          <label className="text-xs font-medium text-slate-600" htmlFor={`${kr.id}-amount`}>
            Today
          </label>
          <input
            id={`${kr.id}-amount`}
            type="number"
            min="0"
            value={Number(log.amount || 0)}
            onChange={(event) => updateLog({ amount: Math.max(0, Number(event.target.value) || 0) })}
            className="h-8 w-20 rounded-lg border border-slate-200 px-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          />
          <span className="text-xs text-slate-600">adds to target {kr.target}</span>
        </div>
      )}

      {kr.scoringType === "binary" && (
        <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm font-medium text-slate-900">
          <span className="grid h-5 w-5 place-items-center rounded border border-slate-300 bg-white">
            {log.complete && <Check size={13} />}
          </span>
          <input
            type="checkbox"
            checked={Boolean(log.complete)}
            onChange={(event) => updateLog({ complete: event.target.checked })}
            className="sr-only"
          />
          Completed today
        </label>
      )}

      {kr.scoringType === "milestone" && (
        <div className="mt-3 grid gap-2">
          {kr.milestones?.map((step) => {
            const checked = Boolean(log.milestones?.[step]);
            return (
              <label key={step} className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-slate-800">
                <span className="grid h-5 w-5 place-items-center rounded border border-slate-300 bg-white">
                  {checked && <Check size={13} />}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    updateLog({
                      milestones: {
                        ...log.milestones,
                        [step]: !checked,
                      },
                    })
                  }
                  className="sr-only"
                />
                {step}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DayEditor({ entry, selectedDate, visibleKrs, isOpen, onClose, onChange, onToday, onResetDay }) {
  const selectedFocuses = Array.isArray(entry.focuses) ? entry.focuses : entry.focus ? [entry.focus] : [];
  const toggleFocus = (focusId) => {
    const nextFocuses = selectedFocuses.includes(focusId)
      ? selectedFocuses.filter((id) => id !== focusId)
      : [...selectedFocuses, focusId];

    onChange({ focuses: nextFocuses, actionDay: nextFocuses.length > 0 || entry.actionDay });
  };

  if (!isOpen) return null;

  return (
    <aside className="lg:sticky lg:top-6">
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase text-slate-600">Selected day</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">{formatDate(selectedDate, { weekday: "short" })}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-9 rounded-lg px-3" onClick={onToday}>
                Today
              </Button>
              <button
                type="button"
                aria-label="Close selected day editor"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="grid h-5 w-5 place-items-center rounded border border-slate-300 bg-white">
              {entry.actionDay && <Check size={14} className="text-slate-950" />}
            </span>
            <input
              type="checkbox"
              checked={entry.actionDay}
              onChange={(event) => onChange({ actionDay: event.target.checked })}
              className="sr-only"
            />
            <span className="text-sm font-medium text-slate-900">Action day</span>
          </label>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase text-slate-600">Focus</p>
            <div className="mt-2 grid gap-2">
              {focusAreas.map((area) => {
                const checked = selectedFocuses.includes(area.id);

                return (
                  <label
                    key={area.id}
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-2.5 text-sm transition",
                      checked ? "border-slate-300 bg-slate-50 text-slate-950" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <span className="grid h-5 w-5 place-items-center rounded border border-slate-300 bg-white">
                      {checked && <Check size={13} className="text-slate-950" />}
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFocus(area.id)}
                      className="sr-only"
                    />
                    <FocusDot focus={area.id} />
                    <span className="font-medium">{area.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase text-slate-600">Intensity</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onChange({ intensity: level, actionDay: true })}
                  className={[
                    "h-9 rounded-lg border text-sm font-medium transition",
                    Number(entry.intensity) === level
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-medium uppercase text-slate-600">KR progress today</p>
            <div className="mt-2 grid max-h-[420px] gap-3 overflow-y-auto pr-1">
              {visibleKrs.length ? (
                visibleKrs.map((kr) => <DayKrLogger key={kr.id} kr={kr} entry={entry} onChange={onChange} />)
              ) : (
                <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                  Select a focus area to show its KRs.
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="text-xs font-medium uppercase text-slate-600" htmlFor="day-notes">
              Notes
            </label>
            <textarea
              id="day-notes"
              value={entry.notes}
              onChange={(event) => onChange({ notes: event.target.value })}
              placeholder="What moved today?"
              className="mt-2 min-h-40 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-600">Changes save automatically on this device.</p>
            <Button variant="outline" className="h-9 rounded-lg px-3" onClick={onResetDay}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function ScoreBar({ score }) {
  return (
    <div className="mt-2">
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-slate-950" style={{ width: formatPercent(score) }} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return <span className={`rounded border px-2 py-0.5 text-[11px] font-medium ${status.className}`}>{status.label}</span>;
}

function NumericKrControls({ kr, progress, sprintStartDate }) {
  const state = getKrState(progress, kr);
  const current = Number(state.current || 0);
  const score = getKrScore(kr, progress);
  const status = getStatus(kr, progress, sprintStartDate);

  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TreeTypeBadge type="kr" />
          <span className="text-xs font-medium text-slate-700">Numeric</span>
          <StatusBadge status={status} />
        </div>
        <span className="text-xs font-medium text-slate-700">Score: {formatScore(score)}</span>
      </div>
      <ScoreBar score={score} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-700">Current: {current} / {kr.target}</span>
        <span className="text-xs text-slate-600">Expected: {formatPercent(getExpectedScore(kr, sprintStartDate))}</span>
      </div>
    </div>
  );
}

function BinaryKrControls({ kr, progress, sprintStartDate }) {
  const state = getKrState(progress, kr);
  const score = getKrScore(kr, progress);
  const status = getStatus(kr, progress, sprintStartDate);

  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TreeTypeBadge type="kr" />
          <span className="text-xs font-medium text-slate-700">Binary</span>
          <StatusBadge status={status} />
        </div>
        <span className="text-xs font-medium text-slate-700">Score: {formatScore(score)}</span>
      </div>
      <div className="mt-3 flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-left text-sm font-medium text-slate-900">
        <span className="grid h-5 w-5 place-items-center rounded border border-slate-300 bg-white">
          {state.complete && <Check size={13} />}
        </span>
        {state.complete ? "Complete" : "Not complete"}
      </div>
    </div>
  );
}

function MilestoneKrControls({ kr, progress, sprintStartDate }) {
  const state = getKrState(progress, kr);
  const score = getKrScore(kr, progress);
  const status = getStatus(kr, progress, sprintStartDate);
  const completed = kr.milestones?.filter((step) => state.milestones?.[step]).length || 0;

  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TreeTypeBadge type="kr" />
          <span className="text-xs font-medium text-slate-700">Milestone</span>
          <StatusBadge status={status} />
        </div>
        <span className="text-xs font-medium text-slate-700">Score: {formatScore(score)}</span>
      </div>
      <ScoreBar score={score} />
      <div className="mt-3 grid gap-2">
        {kr.milestones?.map((step) => {
          const checked = Boolean(state.milestones?.[step]);
          return (
            <div key={step} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm text-slate-800">
              <span className="grid h-5 w-5 place-items-center rounded border border-slate-300 bg-white">
                {checked && <Check size={13} />}
              </span>
              {step}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-slate-600">
        {completed} / {kr.milestones?.length || 0} steps complete
      </p>
    </div>
  );
}

function KrControls({ kr, progress, sprintStartDate }) {
  if (kr.scoringType === "binary") return <BinaryKrControls kr={kr} progress={progress} sprintStartDate={sprintStartDate} />;
  if (kr.scoringType === "milestone") return <MilestoneKrControls kr={kr} progress={progress} sprintStartDate={sprintStartDate} />;
  return <NumericKrControls kr={kr} progress={progress} sprintStartDate={sprintStartDate} />;
}

function TreeTypeBadge({ type }) {
  const label = {
    root: "Dashboard",
    branch: "Branch",
    okr: "OKR",
    objective: "Objective",
    kr: "KR",
    note: "Note",
  }[type];

  if (!label || type === "leaf") return null;

  return <span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium uppercase text-slate-600">{label}</span>;
}

function ReferenceTreeNode({ node, expanded, onToggle, progress, sprintStartDate, depth = 0 }) {
  const hasChildren = Boolean(node.children?.length);
  const isOpen = expanded[node.id] ?? true;
  const objectiveScore = node.type === "okr" ? getObjectiveScore(node, progress) : null;

  return (
    <div className="relative">
      {depth > 0 && <div className="absolute left-0 top-4 h-px w-3 bg-slate-300 sm:w-4" />}
      <div className={depth > 0 ? "pl-3 sm:pl-5" : ""}>
        <div className="group flex min-h-8 items-start gap-2 rounded-md px-2 py-1.5 hover:bg-slate-50">
          {hasChildren ? (
            <button
              type="button"
              aria-label={isOpen ? `Collapse ${node.title}` : `Expand ${node.title}`}
              onClick={() => onToggle(node.id)}
              className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
            >
              {isOpen ? <Minus size={12} /> : <Plus size={12} />}
            </button>
          ) : (
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={node.type === "root" ? "break-words font-semibold text-slate-950" : "break-words text-sm font-medium text-slate-800"}>
                {node.title}
              </span>
              <TreeTypeBadge type={node.type} />
              {node.type === "okr" && (
                <span className="rounded border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700">
                  Objective {formatPercent(objectiveScore)}
                </span>
              )}
            </div>
            {node.body && <p className="mt-1 max-w-4xl text-sm leading-6 text-slate-700">{node.body}</p>}
            {node.type === "okr" && (
              <div className="max-w-lg">
                <ScoreBar score={objectiveScore} />
                <p className="mt-1 text-xs text-slate-600">Objective score: {formatScore(objectiveScore)}</p>
              </div>
            )}
            {node.type === "kr" && <KrControls kr={node} progress={progress} sprintStartDate={sprintStartDate} />}
          </div>
        </div>
        {hasChildren && isOpen && (
          <div className="ml-2 border-l border-slate-300 pl-2 sm:ml-4 sm:pl-3">
            {node.children.map((child) => (
              <ReferenceTreeNode
                key={child.id}
                node={child}
                expanded={expanded}
                onToggle={onToggle}
                progress={progress}
                sprintStartDate={sprintStartDate}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReferencePanel({ progress, sprintStartDate }) {
  const [expanded, setExpanded] = useState({});
  const toggleNode = (id) => {
    setExpanded((current) => ({ ...current, [id]: !(current[id] ?? true) }));
  };

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center gap-2">
        <Target size={17} />
        <h2 className="text-lg font-semibold text-slate-950">OKR Tree Reference</h2>
      </div>
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-3 sm:p-5">
          <div className="min-w-0 font-mono text-xs sm:text-sm">
            <ReferenceTreeNode
              node={referenceTree}
              expanded={expanded}
              onToggle={toggleNode}
              progress={progress}
              sprintStartDate={sprintStartDate}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function OKRProgressSummary({ progress, sprintStartDate, onSprintStartChange }) {
  const okrs = flattenOkrs(referenceTree);
  const overall = getOverallScore(progress);
  const statuses = flattenKrs(referenceTree).reduce(
    (counts, kr) => {
      const status = getStatus(kr, progress, sprintStartDate).label;
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    },
    {}
  );

  return (
    <section className="mt-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase text-slate-600">Calculated OKR Progress</p>
          <div className="mt-1 flex items-end gap-3">
            <span className="text-3xl font-semibold text-slate-950">{formatPercent(overall)}</span>
            <span className="pb-1 text-sm text-slate-700">Score: {formatScore(overall)}</span>
          </div>
        </div>
        <label className="text-xs font-medium uppercase text-slate-600">
          Sprint start
          <input
            type="date"
            value={sprintStartDate}
            onChange={(event) => onSprintStartChange(event.target.value)}
            className="mt-1 block h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm normal-case text-slate-900 outline-none focus:ring-2 focus:ring-slate-300"
          />
        </label>
        <div className="grid gap-2 sm:grid-cols-2 lg:min-w-[560px] lg:grid-cols-4">
          {okrs.map((okr) => (
            <div key={okr.id} className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="break-words text-xs font-medium text-slate-700">{okr.title.replace(/^OKR \d: /, "")}</p>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-slate-950" style={{ width: formatPercent(getObjectiveScore(okr, progress)) }} />
                </div>
                <span className="text-xs font-semibold text-slate-800">{formatPercent(getObjectiveScore(okr, progress))}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-700">
        {["Complete", "Ahead", "On Track", "Behind", "At Risk"].map((label) => (
          <span key={label} className="rounded border border-slate-200 bg-white px-2 py-1">
            {label}: {statuses[label] || 0}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function OKRTreeApp() {
  const today = new Date();
  const todayKey = toDateKey(today.getFullYear() === TRACKING_YEAR ? today : new Date(TRACKING_YEAR, 0, 1));
  const [entries, setEntries] = useState({});
  const [sprintStartDate, setSprintStartDate] = useState(() => {
    try {
      const saved = window.localStorage?.getItem(SPRINT_CONFIG_STORAGE_KEY);
      return saved ? JSON.parse(saved).sprintStartDate || DEFAULT_SPRINT_START_DATE : DEFAULT_SPRINT_START_DATE;
    } catch {
      return DEFAULT_SPRINT_START_DATE;
    }
  });
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const importInputRef = useRef(null);

  const weeks = useMemo(() => buildHeatmapWeeks(TRACKING_YEAR), []);
  const selectedEntry = getEntry(entries, selectedDate);
  const okrProgress = useMemo(() => aggregateKrProgress(entries), [entries]);
  const visibleKrs = useMemo(() => getKrsForFocuses(selectedEntry.focuses || []), [selectedEntry.focuses]);

  useEffect(() => {
    const saved = window.localStorage?.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setEntries(parsed.entries || {});
      setSelectedDate(parsed.selectedDate || todayKey);
    } catch {
      setEntries({});
    }
  }, [todayKey]);

  useEffect(() => {
    window.localStorage?.setItem(STORAGE_KEY, JSON.stringify({ entries, selectedDate }));
  }, [entries, selectedDate]);

  useEffect(() => {
    window.localStorage?.setItem(SPRINT_CONFIG_STORAGE_KEY, JSON.stringify({ sprintStartDate }));
  }, [sprintStartDate]);

  const updateSelectedEntry = (patch) => {
    setEntries((current) => ({
      ...current,
      [selectedDate]: {
        ...defaultEntry(selectedDate),
        ...current[selectedDate],
        ...patch,
      },
    }));
  };

  const resetSelectedDay = () => {
    setEntries((current) => {
      const next = { ...current };
      delete next[selectedDate];
      return next;
    });
  };

  const resetAll = () => {
    window.localStorage?.removeItem(STORAGE_KEY);
    window.localStorage?.removeItem(SPRINT_CONFIG_STORAGE_KEY);
    setEntries({});
    setSprintStartDate(DEFAULT_SPRINT_START_DATE);
    setSelectedDate(todayKey);
    setIsEditorOpen(false);
  };

  const selectDate = (dateKey) => {
    setSelectedDate(dateKey);
    setIsEditorOpen(true);
  };

  const importJson = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        const importedEntries = parsed.entries && typeof parsed.entries === "object" ? parsed.entries : {};
        const importedSprintStart = parsed.sprintStartDate || DEFAULT_SPRINT_START_DATE;

        setEntries(importedEntries);
        setSprintStartDate(importedSprintStart);
        setSelectedDate(todayKey);
        setIsEditorOpen(false);
      } catch {
        window.alert("Import failed. Please choose a valid OKR JSON export file.");
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 md:px-8">
      <section className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="mb-6"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <GitFork size={17} />
                2026 Speed Run
              </div>
              <h1 className="text-3xl font-bold md:text-5xl">Daily Action Map</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700 md:text-base">
                Track action days, focus areas, intensity, and notes without turning the day into admin.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-lg" onClick={() => downloadJson(entries, sprintStartDate)}>
                <Download className="mr-2" size={16} />
                Export
              </Button>
              <input ref={importInputRef} type="file" accept="application/json,.json" onChange={importJson} className="hidden" />
              <Button variant="outline" className="rounded-lg" onClick={() => importInputRef.current?.click()}>
                <Upload className="mr-2" size={16} />
                Import
              </Button>
              <Button variant="outline" className="rounded-lg" onClick={resetAll}>
                <RotateCcw className="mr-2" size={16} />
                Reset
              </Button>
            </div>
          </div>
        </motion.header>

        <section
          className={[
            "grid gap-6 transition-[grid-template-columns] duration-200",
            isEditorOpen ? "lg:grid-cols-[minmax(0,1fr)_360px]" : "lg:grid-cols-[minmax(0,1fr)]",
          ].join(" ")}
        >
          <Card className="min-w-0 border-slate-200 shadow-sm">
            <CardContent className="p-3 sm:p-5 md:p-6">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">{TRACKING_YEAR} Heatmap</h2>
                  <p className="mt-1 text-sm text-slate-700">Click any square to mark the day and write notes.</p>
                </div>
                <div className="flex min-w-0 flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <span key={area.id} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: area.color }} />
                      {area.label}
                    </span>
                  ))}
                </div>
              </div>
              <Heatmap
                weeks={weeks}
                entries={entries}
                selectedDate={selectedDate}
                todayKey={todayKey}
                onSelectDate={selectDate}
              />
            </CardContent>
          </Card>

          <DayEditor
            entry={selectedEntry}
            selectedDate={selectedDate}
            visibleKrs={visibleKrs}
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            onChange={updateSelectedEntry}
            onToday={() => {
              setSelectedDate(todayKey);
              setIsEditorOpen(true);
            }}
            onResetDay={resetSelectedDay}
          />
        </section>

        <ReferencePanel progress={okrProgress} sprintStartDate={sprintStartDate} />
        <OKRProgressSummary progress={okrProgress} sprintStartDate={sprintStartDate} onSprintStartChange={setSprintStartDate} />
      </section>
    </main>
  );
}
