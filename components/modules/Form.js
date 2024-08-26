import { useState } from "react";
import styles from "./form.module.css";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
function Form({ textButton }) {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    name: "",
    lastName: "",
    password: "",
  });
  const changeHandeler = (e) => {
    setFormValue((form) => ({ ...form, [e.target.name]: e.target.value }));
  };
  const submitHandeler = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({
        name: formValue.name,
        lastName: formValue.lastName,
        password: formValue.password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.status === "success") {
      toast.success("با موفقیت تکمیل اطلاعات صورت گرفت 😀");
      router.reload();
    } else if (result.status === "incorrect") {
      toast.error("کلمه عبور اشتباه است 🥲");
    } else {
      toast.error("مشکل در بر قراری ارتباط 🥲");
    }
  };
  return (
    <form className={styles.container} onSubmit={submitHandeler}>
      <label htmlFor="name">
        نام <span>*</span>
      </label>
      <input
        type="text"
        required
        placeholder="نام ..."
        minLength={3}
        name="name"
        id="name"
        value={formValue.name}
        onChange={changeHandeler}
      />
      <label htmlFor="lastName">
        نام خانوادگی <span>*</span>
      </label>
      <input
        type="text"
        placeholder="نام خانوادگی ..."
        minLength={3}
        name="lastName"
        id="lastName"
        value={formValue.lastName}
        onChange={changeHandeler}
      />
      <label htmlFor="password">
        کلمه عبور <span>*</span>
      </label>
      <input
        type="text"
        placeholder="کلمه عبور ..."
        minLength={8}
        name="password"
        id="password"
        value={formValue.password}
        onChange={changeHandeler}
      />
      <input type="submit" value={textButton} className={styles.submit} />
    </form>
  );
}

export default Form;
