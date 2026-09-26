"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ListCalculatorDefinition } from "@/lib/calculators/listRegistry";
import { ListRow } from "@/lib/calculators/listCalculations";
import { formatValue } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import { ResultActions } from "@/components/ResultActions";

interface RawRow {
  value: string;
  weight: string;
}

function toRawRows(rows: ListRow[]): RawRow[] {
  return rows.map((r) => ({ value: String(r.value), weight: String(r.weight) }));
}

export function ListCalculatorShell({ def }: { def: ListCalculatorDefinition }) {
  const [rows, setRows] = useState<RawRow[]>(() => toRawRows(def.defaultRows));
  const hasTrackedOpen = useRef(false);

  useEffect(() => {
    if (!hasTrackedOpen.current) {
      trackEvent("calculator_open", { calculator: def.slug });
      hasTrackedOpen.current = true;
    }
  }, [def.slug]);

  const parsedRows = useMemo<ListRow[]>(
    () =>
      rows.map((r) => ({
        value: r.value === "" ? NaN : Number(r.value),
        weight: r.weight === "" ? NaN : Number(r.weight),
      })),
    [rows]
  );

  const result = useMemo(() => def.calculate(parsedRows), [def, parsedRows]);

  useEffect(() => {
    if (result.ok) trackEvent("calculator_calculated", { calculator: def.slug });
  }, [result, def.slug]);

  function updateRow(index: number, field: "value" | "weight", raw: string) {
    if (raw !== "" && !/^-?\d*\.?\d*$/.test(raw)) return;
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: raw } : row)));
  }

  function addRow() {
    setRows((prev) => [...prev, { value: "", weight: "1" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  function handleReset() {
    setRows(toRawRows(def.defaultRows));
    trackEvent("calculator_reset", { calculator: def.slug });
  }

  const resultSummary = result.ok
    ? `${def.name}: ${def.resultLabel} = ${formatValue(result.values[def.resultId] ?? NaN, "number")}`
    : "";

  return (
    <div className="rounded-2xl border border-ink-300/40 bg-white shadow-sm p-6 sm:p-8">
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              inputMode="decimal"
              aria-label={`Value ${i + 1}`}
              value={row.value}
              onChange={(e) => updateRow(i, "value", e.target.value)}
              placeholder="Value"
              className="w-full rounded-lg border border-ink-300/60 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            {def.weighted && (
              <input
                type="text"
                inputMode="decimal"
                aria-label={`Weight ${i + 1}`}
                value={row.weight}
                onChange={(e) => updateRow(i, "weight", e.target.value)}
                placeholder="Weight"
                className="w-32 rounded-lg border border-ink-300/60 px-3 py-2 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            )}
            <button
              type="button"
              onClick={() => removeRow(i)}
              disabled={rows.length <= 1}
              aria-label={`Remove row ${i + 1}`}
              className="rounded-lg border border-ink-300/60 px-3 py-2 text-ink-500 hover:bg-ink-50 disabled:opacity-40 no-print"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3 no-print">
        <button
          type="button"
          onClick={addRow}
          className="rounded-lg border border-ink-300/60 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          + Add {def.weighted ? "row" : "value"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-ink-300/60 px-4 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          Reset to example
        </button>
      </div>

      <div className="mt-6 border-t border-ink-300/40 pt-6" aria-live="polite">
        {!result.ok ? (
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{result.error}</p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-wide text-ink-500">Your result</p>
            <p className="text-3xl sm:text-4xl font-semibold text-brand-700">
              {formatValue(result.values[def.resultId] ?? NaN, "number")}
            </p>
            <p className="text-sm text-ink-700 max-w-prose">{def.interpret(result.values)}</p>
            <ResultActions summary={resultSummary} />
          </div>
        )}
      </div>
    </div>
  );
}
