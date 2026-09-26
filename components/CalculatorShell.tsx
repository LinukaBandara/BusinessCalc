"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalculatorDefinition } from "@/lib/calculators/types";
import { formatValue } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";
import { ResultActions } from "@/components/ResultActions";

function defaultInputs(def: CalculatorDefinition): Record<string, string> {
  const out: Record<string, string> = {};
  for (const input of def.inputs) out[input.id] = String(input.defaultValue);
  return out;
}

export function CalculatorShell({ def }: { def: CalculatorDefinition }) {
  const [raw, setRaw] = useState<Record<string, string>>(() => defaultInputs(def));
  const hasTrackedOpen = useRef(false);

  useEffect(() => {
    if (!hasTrackedOpen.current) {
      trackEvent("calculator_open", { calculator: def.slug });
      hasTrackedOpen.current = true;
    }
  }, [def.slug]);

  const parsed = useMemo(() => {
    const values: Record<string, number> = {};
    for (const input of def.inputs) {
      const v = raw[input.id];
      values[input.id] = v === "" ? NaN : Number(v);
    }
    return values;
  }, [raw, def.inputs]);

  const result = useMemo(() => def.calculate(parsed), [def, parsed]);

  useEffect(() => {
    if (result.ok) trackEvent("calculator_calculated", { calculator: def.slug });
  }, [result, def.slug]);

  function handleChange(id: string, value: string) {
    // Allow empty string (so the user can clear a field), digits, one decimal point.
    if (value !== "" && !/^-?\d*\.?\d*$/.test(value)) return;
    setRaw((prev) => ({ ...prev, [id]: value }));
  }

  function handleReset() {
    setRaw(defaultInputs(def));
    trackEvent("calculator_reset", { calculator: def.slug });
  }

  const resultSummary = result.ok
    ? `${def.name}: ${def.outputs.map((o) => `${o.label} = ${formatValue(result.values[o.id] ?? NaN, o.format)}`).join(", ")}`
    : "";

  return (
    <div className="rounded-2xl border border-ink-300/40 bg-white shadow-sm p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {def.inputs.map((input) => (
          <div key={input.id} className="flex flex-col gap-1.5">
            <label htmlFor={input.id} className="text-sm font-medium text-ink-700">
              {input.label}
            </label>
            <div className="relative">
              {input.format === "currency" && (
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500">
                  $
                </span>
              )}
              <input
                id={input.id}
                name={input.id}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={raw[input.id] ?? ""}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className={`w-full rounded-lg border border-ink-300/60 bg-white py-2.5 text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 ${
                  input.format === "currency" ? "pl-7 pr-9" : "px-3 pr-9"
                }`}
              />
              {input.format === "percent" && (
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500">
                  %
                </span>
              )}
            </div>
            {input.helpText && <p className="text-xs text-ink-500">{input.helpText}</p>}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 no-print">
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
            <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
              {def.outputs.map((out) => (
                <div key={out.id}>
                  <p className="text-xs text-ink-500">{out.label}</p>
                  <p
                    className={
                      out.highlight
                        ? "text-3xl sm:text-4xl font-semibold text-brand-700"
                        : "text-xl font-medium text-ink-900"
                    }
                  >
                    {formatValue(result.values[out.id] ?? NaN, out.format)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-700 max-w-prose">{def.interpret(result.values)}</p>
            <ResultActions summary={resultSummary} />
          </div>
        )}
      </div>
    </div>
  );
}
