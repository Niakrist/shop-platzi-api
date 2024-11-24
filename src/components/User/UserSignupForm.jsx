import { useState } from "react";
import styles from "../../styles/User.module.css";
import { useDispatch } from "react-redux";
import {
  createUser,
  toggleFormType,
  toggleShowForm,
} from "../../features/user/userSlice";

const UserSignupForm = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
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
    dispatch(createUser(values));
    dispatch(toggleShowForm(false));
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={handleClick} className={styles.close}>
        <svg className={styles["icon"]}>
          <use xlinkHref="/sprite.svg#close" />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

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
            type="name"
            name="name"
            placeholder="Your name"
            value={values.name}
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
          <input
            type="avatar"
            name="avatar"
            placeholder="Your avatar"
            value={values.avatar}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div
          className={styles.link}
          onClick={() => dispatch(toggleFormType("login"))}
        >
          I already have an account
        </div>

        <button className={styles.submit} type="submit">
          Create an account
        </button>
      </form>
    </div>
  );
};

export default UserSignupForm;
