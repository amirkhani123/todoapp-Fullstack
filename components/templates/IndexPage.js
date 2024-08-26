import { useEffect, useState } from "react";
import styles from "./styles/indexPage.module.css";
import Link from "next/link";
import Tasks from "../modules/Tasks";

function IndexPage() {
  const [isSigin, setIsSignin] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "success") {
          setIsSignin(true);
        }
      })
      .catch((error) => {
        setIsSignin(false);
      });
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch("/api/todo");
    const result = await res.json();
    if (result.status === "success") {
      setData(result.data);
    }
  };
  if (!isSigin) {
    return (
      <div className={styles.not_signin}>
        <h2>لطفا وارد حساب کاربری خود شوید😒</h2>
        <p>
          آیا حساب ندارید ؟ <Link href="/auth/signup">ایجاد اکانت</Link>
        </p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {data ? (
        <>
          <div className={styles.todo}>
            <p>شروع</p>
            {data.todo && (
              <Tasks
                data={data?.todo}
                next="inProgress"
                fetchData={fetchData}
              />
            )}
          </div>
          <div className={styles.inProgress}>
            <p>در حال انجام</p>
            {data.inProgress && (
              <Tasks
                data={data?.inProgress}
                next="review"
                back="todo"
                fetchData={fetchData}
              />
            )}
          </div>
          <div className={styles.review}>
            <p>در حال بررسی</p>
            {data.review && (
              <Tasks
                data={data?.review}
                next="done"
                back="inProgress"
                fetchData={fetchData}
              />
            )}
          </div>
          <div className={styles.done}>
            <p>انجام شده</p>
            {data.done && (
              <Tasks data={data?.done} back="review" fetchData={fetchData} />
            )}
          </div>
        </>
      ) : (
        <h5>هیچ کاری یافت نشد 🥲</h5>
      )}
    </div>
  );
}

export default IndexPage;
