"use client"

import { type ComponentType, useEffect, useMemo, useState } from "react"
import { Delete, Divide, Equal, Minus, Percent, Plus, RotateCcw, X } from "lucide-react"

type ButtonTone = "control" | "number" | "operator" | "equal"

type CalcButton = {
  label: string
  value?: string
  tone: ButtonTone
  wide?: boolean
  icon?: ComponentType<{ className?: string }>
  action?: "clear" | "delete" | "percent" | "toggleSign" | "calculate"
}

const operators = new Set(["+", "-", "*", "/"])

const buttons: CalcButton[] = [
  { label: "C", tone: "control", action: "clear", icon: RotateCcw },
  { label: "D", tone: "control", action: "delete", icon: Delete },
  { label: "%", tone: "control", action: "percent", icon: Percent },
  { label: "/", value: "/", tone: "operator", icon: Divide },
  { label: "7", value: "7", tone: "number" },
  { label: "8", value: "8", tone: "number" },
  { label: "9", value: "9", tone: "number" },
  { label: "x", value: "*", tone: "operator", icon: X },
  { label: "4", value: "4", tone: "number" },
  { label: "5", value: "5", tone: "number" },
  { label: "6", value: "6", tone: "number" },
  { label: "-", value: "-", tone: "operator", icon: Minus },
  { label: "1", value: "1", tone: "number" },
  { label: "2", value: "2", tone: "number" },
  { label: "3", value: "3", tone: "number" },
  { label: "+", value: "+", tone: "operator", icon: Plus },
  { label: "+/-", tone: "control", action: "toggleSign" },
  { label: "0", value: "0", tone: "number" },
  { label: ".", value: ".", tone: "number" },
  { label: "=", tone: "equal", action: "calculate", icon: Equal },
]

function formatExpression(value: string) {
  return value.replaceAll("*", "x").replaceAll("/", "÷")
}

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    throw new Error("Invalid result")
  }

  const rounded = Number.parseFloat(value.toFixed(10))
  return rounded.toLocaleString("en-US", {
    maximumFractionDigits: 10,
    useGrouping: false,
  })
}

function currentNumberStart(expression: string) {
  let index = expression.length - 1

  while (index >= 0) {
    const character = expression[index]

    if (operators.has(character)) {
      if (character === "-" && (index === 0 || operators.has(expression[index - 1]))) {
        index -= 1
        continue
      }

      break
    }

    index -= 1
  }

  return index + 1
}

function tokenize(expression: string) {
  const tokens: string[] = []
  let index = 0

  while (index < expression.length) {
    const character = expression[index]
    const isUnaryMinus =
      character === "-" &&
      (index === 0 || operators.has(expression[index - 1])) &&
      /[\d.]/.test(expression[index + 1] ?? "")

    if (/\d|\./.test(character) || isUnaryMinus) {
      let number = isUnaryMinus ? "-" : ""
      index += isUnaryMinus ? 1 : 0

      while (index < expression.length && /[\d.]/.test(expression[index])) {
        number += expression[index]
        index += 1
      }

      if (!/^-?\d*\.?\d+$/.test(number)) {
        throw new Error("Invalid number")
      }

      tokens.push(number)
      continue
    }

    if (operators.has(character)) {
      tokens.push(character)
      index += 1
      continue
    }

    throw new Error("Invalid token")
  }

  return tokens
}

function evaluateExpression(expression: string) {
  if (!expression || operators.has(expression.at(-1) ?? "")) {
    throw new Error("Incomplete expression")
  }

  const precedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 }
  const output: string[] = []
  const operatorStack: string[] = []

  for (const token of tokenize(expression)) {
    if (!Number.isNaN(Number(token))) {
      output.push(token)
      continue
    }

    while (
      operatorStack.length > 0 &&
      precedence[operatorStack.at(-1) ?? ""] >= precedence[token]
    ) {
      output.push(operatorStack.pop() ?? "")
    }

    operatorStack.push(token)
  }

  output.push(...operatorStack.reverse())

  const stack: number[] = []

  for (const token of output) {
    if (!Number.isNaN(Number(token))) {
      stack.push(Number(token))
      continue
    }

    const right = stack.pop()
    const left = stack.pop()

    if (left === undefined || right === undefined) {
      throw new Error("Invalid expression")
    }

    if (token === "+") stack.push(left + right)
    if (token === "-") stack.push(left - right)
    if (token === "*") stack.push(left * right)
    if (token === "/") {
      if (right === 0) throw new Error("Cannot divide by zero")
      stack.push(left / right)
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression")
  }

  return formatNumber(stack[0])
}

function buttonClasses(tone: ButtonTone, wide = false) {
  const base =
    "group relative flex h-16 min-w-0 items-center justify-center overflow-hidden rounded-2xl border text-xl font-semibold tracking-normal shadow-lg shadow-black/20 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 active:scale-95 sm:h-[72px]"
  const width = wide ? "col-span-2" : ""
  const tones: Record<ButtonTone, string> = {
    control:
      "border-white/10 bg-white/[0.08] text-slate-100 hover:border-cyan-200/40 hover:bg-cyan-200/16",
    number:
      "border-white/10 bg-slate-950/50 text-white hover:border-white/25 hover:bg-white/[0.12]",
    operator:
      "border-cyan-300/25 bg-cyan-300/14 text-cyan-100 hover:border-cyan-200/60 hover:bg-cyan-300/24",
    equal:
      "border-transparent bg-cyan-300 text-slate-950 shadow-cyan-400/25 hover:bg-white",
  }

  return `${base} ${width} ${tones[tone]}`
}

export function ModernCalculator() {
  const [expression, setExpression] = useState("0")
  const [justEvaluated, setJustEvaluated] = useState(false)

  const preview = useMemo(() => {
    try {
      if (!/[+\-*/]/.test(expression) || operators.has(expression.at(-1) ?? "")) {
        return ""
      }

      return evaluateExpression(expression)
    } catch {
      return ""
    }
  }, [expression])

  function append(value: string) {
    setExpression((current) => {
      if (current === "Error") {
        return value === "." ? "0." : value
      }

      if (operators.has(value)) {
        setJustEvaluated(false)

        if (operators.has(current.at(-1) ?? "")) {
          return current.slice(0, -1) + value
        }

        return current + value
      }

      if (justEvaluated) {
        setJustEvaluated(false)
        return value === "." ? "0." : value
      }

      const numberStart = currentNumberStart(current)
      const currentNumber = current.slice(numberStart)

      if (value === "." && currentNumber.includes(".")) {
        return current
      }

      if (value === ".") {
        return current === "0" || operators.has(current.at(-1) ?? "") ? `${current}0.` : `${current}.`
      }

      if (current === "0") {
        return value
      }

      if (currentNumber === "0" && value !== ".") {
        return current.slice(0, numberStart) + value
      }

      return current + value
    })
  }

  function clearDisplay() {
    setExpression("0")
    setJustEvaluated(false)
  }

  function deleteLast() {
    setExpression((current) => {
      if (current === "Error" || current.length <= 1) {
        return "0"
      }

      return current.slice(0, -1)
    })
    setJustEvaluated(false)
  }

  function calculate() {
    try {
      setExpression(evaluateExpression(expression))
      setJustEvaluated(true)
    } catch {
      setExpression("Error")
      setJustEvaluated(false)
    }
  }

  function applyPercent() {
    setExpression((current) => {
      if (current === "Error" || operators.has(current.at(-1) ?? "")) {
        return current
      }

      const start = currentNumberStart(current)
      const currentNumber = current.slice(start)
      const percentValue = Number(currentNumber) / 100

      if (!Number.isFinite(percentValue)) {
        return "Error"
      }

      return current.slice(0, start) + formatNumber(percentValue)
    })
    setJustEvaluated(false)
  }

  function toggleSign() {
    setExpression((current) => {
      if (current === "Error") {
        return "0"
      }

      const start = currentNumberStart(current)
      const currentNumber = current.slice(start)

      if (!currentNumber || currentNumber === "0") {
        return current
      }

      if (currentNumber.startsWith("-")) {
        return current.slice(0, start) + currentNumber.slice(1)
      }

      return current.slice(0, start) + `-${currentNumber}`
    })
    setJustEvaluated(false)
  }

  function handleButton(button: CalcButton) {
    if (button.action === "clear") clearDisplay()
    else if (button.action === "delete") deleteLast()
    else if (button.action === "percent") applyPercent()
    else if (button.action === "toggleSign") toggleSign()
    else if (button.action === "calculate") calculate()
    else if (button.value) append(button.value)
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const { key } = event

      if (/^\d$/.test(key)) append(key)
      else if (["+", "-", "*", "/"].includes(key)) append(key)
      else if (key === ".") append(".")
      else if (key === "Enter" || key === "=") calculate()
      else if (key === "Backspace") deleteLast()
      else if (key === "Escape") clearDisplay()
      else if (key === "%") applyPercent()
      else return

      event.preventDefault()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(244,114,182,0.18),transparent_24%),linear-gradient(135deg,#080b13_0%,#111827_45%,#07111f_100%)] px-4 py-8 text-white sm:px-6">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_420px]">
          <div className="hidden lg:block">
            <p className="mb-5 w-fit rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              Modern Calculator
            </p>
            <h1 className="max-w-2xl text-6xl font-semibold leading-[0.95] tracking-normal text-white">
              Fast math with a clean glass interface.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Tap, type, delete, clear, preview, and calculate without the broken display or unsafe button wiring from the original version.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[420px] rounded-[2rem] border border-white/12 bg-white/[0.08] p-4 shadow-2xl shadow-cyan-950/50 backdrop-blur-2xl sm:p-5">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5 shadow-inner shadow-black/40">
              <div className="mb-5 min-h-[132px] rounded-[1.25rem] border border-cyan-200/10 bg-black/35 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                    Calculator
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.95)]" />
                </div>
                <output className="block min-h-12 overflow-hidden text-right text-[clamp(2rem,12vw,3.7rem)] font-semibold leading-none tracking-normal text-white">
                  {formatExpression(expression)}
                </output>
                <output className="mt-4 block h-6 overflow-hidden text-right text-base font-medium text-cyan-200/75">
                  {preview && preview !== expression ? `= ${formatExpression(preview)}` : ""}
                </output>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {buttons.map((button) => {
                  const Icon = button.icon

                  return (
                    <button
                      key={button.label}
                      type="button"
                      aria-label={button.label === "D" ? "Delete" : button.label}
                      className={buttonClasses(button.tone, button.wide)}
                      onClick={() => handleButton(button)}
                    >
                      <span className="absolute inset-x-3 top-0 h-px bg-white/25 opacity-70" />
                      {Icon ? <Icon className="size-5" /> : button.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
