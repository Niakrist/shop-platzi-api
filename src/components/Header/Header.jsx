import styles from "../../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import logoSrc from "../../images/logo.svg";
import avatarSrc from "../../images/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowForm } from "../../features/user/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const [values, setValues] = useState({ name: "Guest", avatar: avatarSrc });
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleShowForm(true));
    } else {
      navigate(ROUTES.PROFILE);
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Link to={ROUTES.HOME}>
            <img src={logoSrc} alt="logo" />
          </Link>
        </div>
        <div className={styles.info}>
          <div className={styles.user} onClick={handleClick}>
            <div
              className={styles.avatar}
              style={{
                backgroundImage: `url(${values.avatar})`,
              }}
            ></div>
            <div className={styles.username}>{values.name}</div>
          </div>
          <form className={styles.form}>
            <div className={styles.icon}>
              <svg className="icon">
                <use xlinkHref="/sprite.svg#search" />
              </svg>
            </div>
            <div className={styles.input}>
              <input
                type="search"
                name="search"
                placeholder="Search for anything..."
                autoComplete="off"
                onChange={() => {}}
                value={""}
              />
            </div>
            <div className={styles.box}></div>
          </form>
          <div className={styles.account}>
            <Link to={ROUTES.HOME} className={styles.favourites}>
              <svg className={styles["icon-fav"]}>
                <use xlinkHref="/sprite.svg#heart" />
              </svg>
            </Link>
            <Link to={ROUTES.CART} className={styles.cart}>
              <svg className={styles["icon-cart"]}>
                <use xlinkHref="/sprite.svg#bag" />
              </svg>
              <span className={styles.count}>10</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
