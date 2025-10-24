const PRICE_DISPLAY_FORMATTER = new Intl.NumberFormat("et-EE", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const sanitizePriceInput = (raw) => {
  if (!raw) return "";
  let s = String(raw).replace(/\s+/g, "").replace(",", ".");
  s = s.replace(/[^\d.]/g, "");
  const firstDot = s.indexOf(".");
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
  }
  const [intPart, decPart] = s.split(".");
  return decPart !== undefined ? `${intPart}.${decPart.slice(0, 2)}` : intPart;
};

export const parseSanitizedToCents = (value) => {
  if (!value) return 0;
  const [intPartRaw, decPartRaw] = String(value).split(".");
  const intPart = Number.parseInt(intPartRaw, 10);
  if (!Number.isFinite(intPart)) return 0;

  if (!decPartRaw) {
    return intPart * 100;
  }

  const decimalsString = decPartRaw.padEnd(2, "0").slice(0, 2);
  const decimals = Number.parseInt(decimalsString, 10);

  return intPart * 100 + (Number.isFinite(decimals) ? decimals : 0);
};

export const formatCents = (cents) =>
  PRICE_DISPLAY_FORMATTER.format(cents / 100);
