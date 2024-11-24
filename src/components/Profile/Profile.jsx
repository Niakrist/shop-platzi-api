import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles//Profile.module.css";
import { useEffect, useState } from "react";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log("+++");
    e.preventDefault();
    const isEmpty = Object.values(values).every((elem) => elem);
    if (!isEmpty) return;
    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to login</span>
      ) : (
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
          </div>
          <div className={styles.group}>
            <input
              type="name"
              name="name"
              placeholder="Your name"
              value={values.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={styles.group}>
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
          <div className={styles.group}>
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
          <button className={styles.submit} type="submit">
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;
