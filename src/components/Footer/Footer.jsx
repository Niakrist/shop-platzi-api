import styles from "../../styles/Footer.module.css";
import { Link } from "react-router-dom";
import logoSrc from "../../images/logo.svg";
import { ROUTES } from "../../utils/routes";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={logoSrc} alt="logo" />
        </Link>
      </div>

      <div className={styles.rights}>
        Developed by{" "}
        <a href="#!" target="_blank" rel="noreferrer">
          Abcdef
        </a>
      </div>
      <div className={styles.socials}>
        <a href="#!" target="_blank" rel="noreferrer">
          <svg className={styles["icon-cart"]}>
            <use xlinkHref="/sprite.svg#instagram" />
          </svg>
        </a>

        <a href="#!" target="_blank" rel="noreferrer">
          <svg className={styles["icon-cart"]}>
            <use xlinkHref="/sprite.svg#youtube" />
          </svg>
        </a>

        <a href="#!" target="_blank" rel="noreferrer">
          <svg className={styles["icon-cart"]}>
            <use xlinkHref="/sprite.svg#facebook" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
