import "./Contact.css";
import call from "../assets/call.png";
import drafts from "../assets/drafts.png";
import support from "../assets/support.png";

const CONTACT_TITLE_LIGHT = "LHV";
const CONTACT_TITLE_BOLD = "Klienditugi";
const CONTACT_TEXT =
  "Kui sul tekib pangateenuse kasutamisel probleeme, saad klienditoe infotelefonilt abi ööpäev ringi.";
const TEL_NUMBER = "6 800 400";
const TEL_HREF = "tel:6800400";
const EMAIL = "info@lhv.ee";
const EMAIL_HREF = "mailto:info@lhv.ee";

function ContactRow({ icon, label, href, underline = false }) {
  return (
    <a
      className={`contact__row${underline ? " contact__row--underline" : ""}`}
      href={href}
    >
      <img className="contact__row-icon" src={icon} alt="" />
      <span className="contact__row-text">{label}</span>
    </a>
  );
}

export default function Contact() {
  return (
    <div className="contact">
      <section className="contact__card" aria-labelledby="contact-title">
        <div className="contact__left">
          <div className="contact__badge" aria-hidden>
            <img src={support} alt="" className="contact__badge-image" />
          </div>

          <div className="contact__copy">
            <h3 id="contact-title" className="contact__title">
              <span className="contact__title-part contact__title-part--light">
                {CONTACT_TITLE_LIGHT}
              </span>{" "}
              <span className="contact__title-part contact__title-part--bold">
                {CONTACT_TITLE_BOLD}
              </span>
            </h3>
            <p className="contact__text">{CONTACT_TEXT}</p>
          </div>
        </div>

        <div className="contact__links">
          <ContactRow icon={call} label={TEL_NUMBER} href={TEL_HREF} />
          <ContactRow icon={drafts} label={EMAIL} href={EMAIL_HREF} underline />
        </div>
      </section>
    </div>
  );
}
