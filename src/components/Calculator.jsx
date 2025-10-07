import { useMemo, useState } from "react";
import "./Calculator.css";
import circle_plus from "../assets/circle_plus.png";
import trash from "../assets/trash.png";

const CALC_TITLE = "Koosta soovinimekiri ja vaata oma uue sisustuse kuumakset";
const LABEL_PRODUCT = "TOODE";
const LABEL_PRICE = "HIND";
const ADD_ITEM = "Lisa toode";
const REMOVE_ITEM = "Kustuta";
const CTA_TEXT = "Taotle sisustuslaenu";
const TERMS_TEXT = "Tutvu tingimustega";
const CTA_URL = "https://www.lhv.ee/et/sisustuslaen/taotlus";
const TERMS_URL = "https://www.lhv.ee/et/sisustuslaen#tingimused-tab";

export default function Calculator() {
  const [items, setItems] = useState([
    { name: "Diivan", price: 500 },
    { name: "Lamp", price: 85 },
  ]);

  const total = useMemo(
    () =>
      items.reduce((sum, it) => {
        const val = parseFloat(String(it.price).replace(",", "."));
        return sum + (Number.isFinite(val) ? val : 0);
      }, 0),
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

  const sanitizePriceInput = (raw) => {
    if (!raw) return "";
    let s = String(raw).replace(/\s+/g, "").replace(",", ".");
    s = s.replace(/[^\d.]/g, "");
    const firstDot = s.indexOf(".");
    if (firstDot !== -1) {
      s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
    }
    const [intPart, decPart] = s.split(".");
    return decPart !== undefined
      ? `${intPart}.${decPart.slice(0, 2)}`
      : intPart;
  };

  const formatEtNumber = (val) => {
    const n = parseFloat(val);
    if (!Number.isFinite(n)) return "";
    return new Intl.NumberFormat("et-EE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(n);
  };

  return (
    <section className="calc-wrap" aria-labelledby="calc-title">
      <header className="calc-title-row">
        <h2 id="calc-title" className="calc-title">
          {CALC_TITLE}
        </h2>
      </header>

      <div className="calc-grid">
        <div className="calc-fields">
          <div className="cols-header">
            <span className="col-label">{LABEL_PRODUCT}</span>
            <span className="col-label">{LABEL_PRICE}</span>
          </div>

          <div className="cols">
            <div className="col col-names">
              {items.map((it, i) => (
                <label className="underline" key={`n-${i}`}>
                  <input
                    className="input"
                    type="text"
                    value={it.name}
                    placeholder=""
                    aria-label={`${LABEL_PRODUCT} ${i + 1}`}
                    onChange={(e) => updateItem(i, "name", e.target.value)}
                  />
                </label>
              ))}
            </div>

            <div className="col col-prices">
              {items.map((it, i) => (
                <label className="underline price" key={`p-${i}`}>
                  <input
                    className="input input-price"
                    inputMode="decimal"
                    type="text"
                    pattern="^\d+([.,]\d{0,2})?$"
                    value={it.price}
                    placeholder=""
                    aria-label={`${LABEL_PRICE} ${i + 1}`}
                    onChange={(e) => {
                      const v = sanitizePriceInput(e.target.value);
                      updateItem(i, "price", v);
                    }}
                    onBlur={(e) => {
                      const v = sanitizePriceInput(e.target.value);
                      if (v === "") return;
                      updateItem(i, "price", formatEtNumber(v));
                    }}
                  />
                  <span className="euro" aria-hidden>
                    €
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="calc-actions">
            <button
              type="button"
              className="link-with-icon"
              onClick={addItem}
              aria-label={ADD_ITEM}
            >
              <img src={circle_plus} alt="" className="icon" />
              <span className="link-text">{ADD_ITEM}</span>
            </button>

            <button
              type="button"
              className="link-with-icon"
              onClick={removeLast}
              disabled={items.length <= 1}
              aria-label={REMOVE_ITEM}
            >
              <img src={trash} alt="" className="icon" />
              <span className="link-text">{REMOVE_ITEM}</span>
            </button>
          </div>
        </div>

        <aside className="calc-summary" aria-live="polite">
          <div className="total-wrap">
            <div className="total">
              {Intl.NumberFormat("et-EE").format(total)}&nbsp;€
            </div>
          </div>

          <div className="cta-wrap">
            <a href={CTA_URL} className="cta-btn">
              {CTA_TEXT}
            </a>

            <a
              className="terms-link"
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
