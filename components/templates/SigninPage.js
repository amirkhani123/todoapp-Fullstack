import { useEffect, useState } from "react";
import styles from "./styles/formStyle.module.css";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxAvatar } from "react-icons/rx";
import toast from "react-hot-toast";

function SignIn() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    userName: "",
    password: "",
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
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        userName: formValue.userName,
        password: formValue.password,
      }),
      headers: { "Content-type": "application/json" },
    });
    const result = await res.json();
    if (result.status === "success") {
      router.replace("/");
      toast.success("خوش آمدید 👋🏻");
    } else if (res.status === "existing") {
      toast.error("نام کاربری یافت نشد 🥲");
    } else {
      toast.error("نام کاربری یا گذرواژه اشتباه است😒");
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={creteUserHandeler}>
        <RxAvatar size={"55px"} color="#4361ee" />
        <h2>ورود به حساب کاربری</h2>
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
            required
            minLength={8}
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
        <p>
          آیا اکانت ندارید ؟ <Link href="/auth/signup">ساخت اکانت</Link>
        </p>
        <input type="submit" value="ورورد" className={styles.submitBut} />
      </form>
    </div>
  );
}

export default SignIn;
