import { useState } from "react";
import "./Info.css";
import infoImage from "../assets/infoImage.png";
import cornerFlip from "../assets/cornerFlip.png";

const LHV_INFO_URL = "https://www.lhv.ee/et/sisustuslaen#lisateave-tab";
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
      className="info__link"
      href={LHV_INFO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className="info__link-text">{LINK_TEXT}</span>
      <ArrowIcon className="info__link-icon" />
    </a>
  );
}

export default function Info() {
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped((f) => !f);

  return (
    <div className="info">
      <img className="info__image" src={infoImage} alt="" />
      <section className="info__card">
        <div className="info__content">
          <h3 className="info__title">{TITLE}</h3>
          <p className="info__text">{BODY}</p>
          <InfoLink />
        </div>
      </section>

      <h2 className="info__mobile-heading">{MOBILE_HEADING}</h2>
      <div
        className="info__tile"
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label="Pööra kaart"
        onClick={toggleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleFlip();
          }
        }}
      >
        <div
          className={`info__flip-inner ${
            flipped ? "info__flip-inner--flipped" : ""
          }`}
        >
          <div className="info__flip-face info__flip-face--front">
            <img className="info__tile-image" src={infoImage} alt="" />
            <div className="info__tile-banner">
              <h5 className="info__tile-title">{TITLE}</h5>
              <button
                className="info__tile-corner"
                type="button"
                aria-label="Pööra kaart"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFlip();
                }}
              >
                <img
                  src={cornerFlip}
                  alt=""
                  className="info__tile-corner-image"
                />
              </button>
            </div>
          </div>

          <div className="info__flip-face info__flip-face--back">
            <div className="info__tile-back-content">
              <p className="info__tile-text">{BODY}</p>
              <InfoLink stopFlip />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
