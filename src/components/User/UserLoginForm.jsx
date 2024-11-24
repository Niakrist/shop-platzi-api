import { useState } from "react";
import styles from "../../styles/User.module.css";
import { useDispatch } from "react-redux";
import {
  loginUser,
  toggleFormType,
  toggleShowForm,
} from "../../features/user/userSlice";
const UserLoginForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    dispatch(toggleShowForm(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(values).every((elem) => elem);
    if (!isEmpty) return;
    dispatch(loginUser(values));
    dispatch(toggleShowForm(false));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div onClick={handleClick} className={styles.close}>
          <svg className={styles["icon"]}>
            <use xlinkHref="/sprite.svg#close" />
          </svg>
        </div>

        <div className={styles.title}>Login</div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={values.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={values.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div
            className={styles.link}
            onClick={() => dispatch(toggleFormType("signup"))}
          >
            Create an account
          </div>

          <button className={styles.submit} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default UserLoginForm;
