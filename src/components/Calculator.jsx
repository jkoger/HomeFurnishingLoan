import { useMemo, useState } from "react";
import "./Calculator.css";
import circle_plus from "../assets/circle_plus.png";
import trash from "../assets/trash.png";

const CALC_TITLE_BOLD = "Koosta soovinimekiri";
const CALC_TITLE_LIGHT = "ja vaata oma uue sisustuse kuumakset";
const LABEL_PRODUCT = "TOODE";
const LABEL_PRICE = "HIND";
const ADD_ITEM = "Lisa toode";
const REMOVE_ITEM = "Kustuta";
const CTA_TEXT = "Taotle sisustuslaenu";
const TERMS_TEXT = "Tutvu tingimustega";
const CTA_URL = "https://www.lhv.ee/et/sisustuslaen/taotlus";
const TERMS_URL = "https://www.lhv.ee/et/sisustuslaen#tingimused-tab";

const PRICE_DISPLAY_FORMATTER = new Intl.NumberFormat("et-EE", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const sanitizePriceInput = (raw) => {
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

const parseSanitizedToCents = (value) => {
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

const formatCents = (cents) => PRICE_DISPLAY_FORMATTER.format(cents / 100);

export default function Calculator() {
  const [items, setItems] = useState([
    { name: "Diivan", price: 500 },
    { name: "Lamp", price: 85 },
  ]);

  const totalCents = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum + parseSanitizedToCents(sanitizePriceInput(item.price)),
        0,
      ),
    [items],
  );

  const updateItem = (idx, key, value) => {
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, [key]: value } : it)),
    );
  };

  const addItem = () => {
    setItems((prev) => [...prev, { name: "", price: "" }]);
  };

  const removeLast = () => {
    setItems((prev) => {
      if (prev.length > 1) return prev.slice(0, -1);
      return [{ name: "", price: "" }];
    });
  };

  const formatEtNumber = (val) => {
    const cents = parseSanitizedToCents(val);
    return formatCents(cents);
  };

  return (
    <section className="calculator" aria-labelledby="calc-title">
      <header className="calculator__title-row">
        <h2 id="calc-title" className="calculator__title">
          <span className="calculator__title-part calculator__title-part--bold">
            {CALC_TITLE_BOLD}
          </span>{" "}
          <span className="calculator__title-part calculator__title-part--light">
            {CALC_TITLE_LIGHT}
          </span>
        </h2>
      </header>

      <div className="calculator__grid">
        <div className="calculator__fields">
          <div className="calculator__columns-header">
            <span className="calculator__column-label">{LABEL_PRODUCT}</span>
            <span className="calculator__column-label">{LABEL_PRICE}</span>
          </div>

          <div className="calculator__columns">
            <div className="calculator__column">
              {items.map((it, i) => (
                <label className="calculator__input-row" key={`n-${i}`}>
                  <input
                    className="calculator__input"
                    type="text"
                    value={it.name}
                    placeholder=""
                    aria-label={`${LABEL_PRODUCT} ${i + 1}`}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                  />
                </label>
              ))}
            </div>

            <div className="calculator__column">
              {items.map((it, i) => (
                <label
                  className="calculator__input-row calculator__input-row--price"
                  key={`p-${i}`}
                >
                  <input
                    className="calculator__input calculator__input--price"
                    inputMode="decimal"
                    type="text"
                    pattern="^\\d+([.,]\\d{0,2})?$"
                    value={it.price}
                    placeholder=""
                    aria-label={`${LABEL_PRICE} ${i + 1}`}
                    onChange={(e) => {
                      const sanitized = sanitizePriceInput(e.target.value);
                      updateItem(i, "price", sanitized);
                    }}
                    onBlur={(e) => {
                      const sanitized = sanitizePriceInput(e.target.value);
                      if (sanitized === "") {
                        updateItem(i, "price", "");
                        return;
                      }
                      updateItem(i, "price", formatEtNumber(sanitized));
                    }}
                  />
                  <span className="calculator__currency" aria-hidden>
                    €
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="calculator__actions">
            <button
              type="button"
              className="calculator__action-link"
              onClick={addItem}
              aria-label={ADD_ITEM}
            >
              <img
                src={circle_plus}
                alt=""
                className="calculator__action-link-icon"
              />
              <span className="calculator__action-link-text">{ADD_ITEM}</span>
            </button>

            <button
              type="button"
              className="calculator__action-link"
              onClick={removeLast}
              disabled={items.length <= 1}
              aria-label={REMOVE_ITEM}
            >
              <img
                src={trash}
                alt=""
                className="calculator__action-link-icon"
              />
              <span className="calculator__action-link-text">
                {REMOVE_ITEM}
              </span>
            </button>
          </div>
        </div>

        <aside className="calculator__summary" aria-live="polite">
          <div className="calculator__total">
            <div className="calculator__total-value">
              {formatCents(totalCents)}&nbsp;€
            </div>
          </div>

          <div className="calculator__cta">
            <a href={CTA_URL} className="calculator__cta-button">
              {CTA_TEXT}
            </a>

            <a
              className="calculator__terms-link"
              href={TERMS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {TERMS_TEXT}
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
