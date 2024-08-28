import Link from "next/link";
import styles from "./layout.module.css";
import { CiCircleList, CiLogin, CiLogout } from "react-icons/ci";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard, RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
function Layout({ children }) {
  const [isMenu, setIsMenu] = useState(false);
  const menu = useRef();
  const menuHandeler = () => {
    setIsMenu(!isMenu);
    if (isMenu) {
      menu.current.style.display = "block";
    } else {
      menu.current.style.display = "none";
    }
  };
  const router = useRouter();
  const signOutHandeler = async () => {
    const res = await fetch("/api/auth/signout");
    toast.success("با موفیت از حساب کاربری خارج شدید 🥲");
    setIsSignin(false);
    router.reload();
  };
  const [isSignin, setIsSignin] = useState(false);
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setIsSignin(true);
        }
      });
  }, []);
  return (
    <div className={styles.container}>
      <header>
        <div className={styles.menu}>
          <p>برنامه مدریت کارهای روزانه</p>
          <button
            onClick={menuHandeler}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#ffffff",
            }}
          >
            <RxHamburgerMenu size={45} />
          </button>
        </div>
        <div>
          {isSignin ? (
            <button onClick={signOutHandeler} className={styles.signout}>
              خروج <CiLogout />
            </button>
          ) : (
            <Link href="/auth/signin" className={styles.signin}>
              ورود
              <CiLogin size={25} />
            </Link>
          )}
        </div>
      </header>
      <div className={styles.subContainer}>
        <aside className={styles.aside} ref={menu}>
          <p>خوش آمدید 👋🏻</p>
          <ul>
            <li>
              <CiCircleList />
              <Link href="/">کارها</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/add-todo">اضافه کردن کار جدید</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/profile">حساب کاربری</Link>
            </li>
          </ul>
        </aside>
        <section className={styles.section}>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
