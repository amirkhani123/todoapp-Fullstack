import { useEffect, useState } from "react";
import styles from "./styles/formStyle.module.css";
import { IoEyeSharp } from "react-icons/io5";
import { BsEyeSlashFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxAvatar } from "react-icons/rx";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

function SignIn() {
  const [show, setShow] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    userName: "",
    password: "",
  });
  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status]);
  const changeHandeler = (e) => {
    setFormValue((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const creteUserHandeler = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      userName: formValue.userName,
      password: formValue.password,
      redirect: false,
    });
    if (!res.error) {
      router.replace("/");
      toast.success("خوش آمدید 👋🏻");
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
        <p>
          آیا اکانت ندارید ؟ <Link href="/auth/signup">ساخت اکانت</Link>
        </p>
        <input type="submit" value="ورورد" className={styles.submitBut} />
      </form>
    </div>
  );
}

export default SignIn;
