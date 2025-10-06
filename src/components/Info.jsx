import { useState } from "react";
import "./Info.css";
import infoImage from "../assets/infoImage.png";
import cornerFlip from "../assets/cornerFlip.png";

const LHV_URL = "https://www.lhv.ee/et/sisustuslaen";
const TITLE = "Kas sinu diivan on oma aja ära elanud?";
const BODY =
  "Oled väsinud segadusest, kus asjadel pole oma kohta. Oled unistanud ilusast lihtsast uuest sisekujundusest, aga kõik tundub korraga liiga kallis? LHV sisustuslaenuga saad oma unistused ellu viia juba täna.";
const LINK_TEXT = "Loe lisa";
const MOBILE_HEADING = "Sisustuslaen";

function ArrowIcon({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M3 8h10"
        stroke="#262633"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 12L3 8l4-4"
        stroke="#262633"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoLink({ stopFlip = false, ariaLabel = LINK_TEXT }) {
  const onClick = (e) => stopFlip && e.stopPropagation();
  return (
    <a
      className="info-link"
      href={LHV_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className="info-link-text">{LINK_TEXT}</span>
      <ArrowIcon className="info-link-icon" />
    </a>
  );
}

export default function Info() {
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped((f) => !f);

  return (
    <div className="info-wrap">
      <img className="info-img" src={infoImage} alt="" />
      <section className="info-card">
        <div className="info-content">
          <h3 className="info-title">{TITLE}</h3>
          <p className="info-text">{BODY}</p>
          <InfoLink />
        </div>
      </section>

      <h2 className="info-mobile-heading">{MOBILE_HEADING}</h2>
      <div
        className="info-tile"
        aria-live="polite"
        role="button"
        tabIndex={0}
        onClick={toggleFlip}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleFlip()}
      >
        <div className={`flip-inner ${flipped ? "is-flipped" : ""}`}>
          <div className="flip-face flip-front">
            <img className="tile-img" src={infoImage} alt="" />
            <div className="tile-banner">
              <h5 className="tile-title">{TITLE}</h5>
              <button
                className="tile-corner"
                type="button"
                aria-label="Pööra kaart"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlip();
                }}
              >
                <img src={cornerFlip} alt="" className="tile-corner-img" />
              </button>
            </div>
          </div>

          <div className="flip-face flip-back">
            <div className="tile-back-content">
              <p className="tile-text">{BODY}</p>
              <InfoLink stopFlip />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
