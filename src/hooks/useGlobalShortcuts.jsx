import { useEffect } from "react";

export function useGlobalShortcuts(shortcutMap) {
  useEffect(() => {
    const handler = (e) => {
      const keyCombo = [
        e.ctrlKey ? "ctrl" : null,
        e.shiftKey ? "shift" : null,
        e.altKey ? "alt" : null,
        e.metaKey ? "meta" : null,
        e.key.toLowerCase(),
      ]
        .filter(Boolean)
        .join("+");

      if (shortcutMap[keyCombo]) {
        e.preventDefault();
        shortcutMap[keyCombo](e); 
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcutMap]);
}