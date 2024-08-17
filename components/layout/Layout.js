import Link from "next/link";
import styles from "./layout.module.css";
import { CiCircleList } from "react-icons/ci";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header>
        <p>برنامه مدریت کارهای روزانه</p>
      </header>
      <div className={styles.subContainer}>
        <aside className={styles.aside}>
          <p>خوش آمدید 👋🏻</p>
          <ul>
            <li>
              <CiCircleList />
              <Link href="/">کارها</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href="/">اضافه کردن کار جدید</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href="/">حساب کاربری</Link>
            </li>
          </ul>
        </aside>
        <section className={styles.section}>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
