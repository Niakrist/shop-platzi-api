import styles from "../../styles/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import logoSrc from "../../images/logo.svg";
import avatarSrc from "../../images/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { toggleShowForm } from "../../features/user/userSlice";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const [values, setValues] = useState({ name: "Guest", avatar: avatarSrc });
  const [search, setSearch] = useState("");
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const { data, isLoading } = useGetProductsQuery({ title: search });
  console.log("data: ", data);

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
                onChange={handleSearch}
                value={search}
              />
            </div>
            {search && (
              <div className={styles.box}>
                {isLoading
                  ? "Loading"
                  : !data.length
                  ? "not result"
                  : data.map(({ id, title, images }) => {
                      return (
                        <Link
                          onClick={() => setSearch("")}
                          className={styles.item}
                          key={id}
                          to={`/products/${id}`}
                        >
                          <div
                            className={styles.image}
                            style={{ backgroundImage: `url(${images[0]})` }}
                          ></div>
                          <div className={styles.title}>{title}</div>
                        </Link>
                      );
                    })}
              </div>
            )}
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
