const TFA_KEY = "tfa";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function storeTFA(value: string) {
  const data = {
    value,
    timestamp: Date.now(),
  };
  localStorage.setItem(TFA_KEY, JSON.stringify(data));
}

export function checkTFA(): string | null {
  const stored = localStorage.getItem(TFA_KEY);
  if (!stored) return null;

  try {
    const data = JSON.parse(stored) as { value: string; timestamp: number };
    const now = Date.now();

    if (now - data.timestamp > THIRTY_DAYS_MS) {
      localStorage.removeItem(TFA_KEY);
      return null;
    }

    return data.value;
  } catch (e) {
    console.error("Invalid TFA data format", e);
    localStorage.removeItem(TFA_KEY);
    return null;
  }
}
