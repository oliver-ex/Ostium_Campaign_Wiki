export function campaignContext(f: Record<string, unknown>): string {
  const type = String(f.type || "")
  const stateLabel =
    type === "npc"
      ? "Life status"
      : type === "location"
        ? "Condition"
        : ["session-log", "session-prep"].includes(type)
          ? "Session state"
          : "State"
  return [
    type.replaceAll("-", " "),
    f.table,
    f.status
      ? `${f.status === "unrevealed" ? "PC knowledge" : stateLabel}: ${f.status}`
      : undefined,
    f.condition && f.condition !== f.status ? `Condition: ${f.condition}` : undefined,
    f["lore-status"] ? `Lore: ${f["lore-status"]}` : undefined,
  ]
    .filter(Boolean)
    .join(" · ")
}
