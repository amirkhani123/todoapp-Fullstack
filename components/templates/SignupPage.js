import { useEffect, useState } from "react";
import styles from "./styles/formStyle.module.css";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";
function SignupPage() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    userName: "",
    password: "",
    repassword: "",
  });
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          router.replace("/");
        }
      });
  }, []);
  const changeHandeler = (e) => {
    setFormValue((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const creteUserHandeler = async (e) => {
    e.preventDefault();
    if (formValue.password !== formValue.repassword) {
      return toast.error("کلمه عبور با تکرار کلمه عبور متفاوت است");
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
      toast.success("حساب کاربری ساخته شد 😀");
      router.replace("/auth/signin");
    } else if (result.status === "existing") {
      toast.error("نام کاربری در دیتا بیس وجود دارد 😒");
    } else {
      toast.error("حساب کاربری ساخته نشد 😒");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={creteUserHandeler}>
        <RxAvatar size={"55px"} color="#4361ee" />
        <h2>ساخت حساب کاربری</h2>
        <div className={styles.inputs}>
          <input
            type="userName"
            placeholder="نام کاربری ..."
            value={formValue.userName}
            name="userName"
            onChange={changeHandeler}
            minLength={5}
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
            minLength={8}
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
          اکانت دارید؟ <Link href="/auth/signin">ورود به حساب کاربری</Link>
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
