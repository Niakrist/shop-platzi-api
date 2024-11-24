import { NavLink } from "react-router-dom";
import styles from "../../styles/Sidebar.module.css";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.categories);

  return (
    <section className={styles.sidebar}>
      <div className={styles.title}>CATEGORIES</div>
      <nav>
        <ul className={styles.menu}>
          {categories.slice(0, 10).map((category) => (
            <li key={category.id}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : null}`
                }
                to={`/categories/${category.id}`}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a className={styles.link} href="/help" target="_blank">
          Help
        </a>
        <a
          className={styles.link}
          href="/term"
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          Terms & Conditions
        </a>
      </div>
    </section>
  );
};

export default Sidebar;
