import UserSignupForm from "./UserSignupForm";
import UserLoginForm from "./UserLoginForm";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles//User.module.css";
import { toggleShowForm } from "../../features/user/userSlice";

const UserForm = () => {
  const { showForm, formType } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleShowForm(false));
  };

  return (
    <>
      {showForm && (
        <>
          <div onClick={handleClick} className={styles.overlay}></div>
          {formType === "signup" ? <UserSignupForm /> : <UserLoginForm />}
        </>
      )}
    </>
  );
};

export default UserForm;
