import { useState } from "react";
import styles from "./styles/signup.module.css";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxAvatar } from "react-icons/rx";
function SignupPage() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    userName: "",
    password: "",
    repassword: "",
  });
  const changeHandeler = (e) => {
    setFormValue((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const creteUserHandeler = async (e) => {
    e.preventDefault();
    if (formValue.password !== formValue.repassword) {
      return alert("کلمه عبور با تکرار کلمه عبور متفاوت است");
    }
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        userName: formValue.userName,
        password: formValue.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.status === "success") {
      alert("حساب کاربری ساخته شد");
      router.replace("/sighin");
    } else if (result.status === "existing") {
      alert("نام کاربری در دیتا بیس وجود دارد");
    } else {
      alert("حساب کاربری ساخته نشد");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={creteUserHandeler}>
        <RxAvatar size={"55px"} color="#4361ee" />
        <h2>ساخت حساب کاربری</h2>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="نام کاربری ..."
            value={formValue.userName}
            name="userName"
            onChange={changeHandeler}
            required
          />
        </div>
        <div className={styles.inputs}>
          <input
            type={show ? "text" : "password"}
            placeholder=" کلمه عبور ..."
            value={formValue.password}
            onChange={changeHandeler}
            name="password"
            required
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setShow(!show);
            }}
          >
            {!show ? <IoEyeSharp /> : <BsEyeSlashFill />}
          </button>
        </div>
        <div className={styles.inputs}>
          <input
            type={show ? "text" : "password"}
            placeholder="تکرار کلمه عبور ..."
            value={formValue.repassword}
            onChange={changeHandeler}
            name="repassword"
            required
          />
        </div>
        <p>
          اکانت دارید؟ <Link href="signin">ورود به حساب کاربری</Link>
        </p>
        <input
          type="submit"
          value="ساخت حساب کاربری"
          className={styles.submitBut}
        />
      </form>
    </div>
  );
}

export default SignupPage;
