import { RiMastodonLine } from "react-icons/ri";
import styles from "./tasks.module.css";
import toast from "react-hot-toast";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
function Tasks({ data, next, back, fetchData }) {
  const changeHandeler = async (id, status) => {
    const res = await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      fetchData();
      toast.success("با موفیقت ویرایش  شد 😀");
    } else {
      toast.error("ارتباط برقرار نشد🥲");
    }
  };
  const deleteHandler = async (id) => {
    const res = await fetch("/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.status === "success") {
      toast.success("با موفقیت پاک شد 😀");
      fetchData();
    } else {
      toast.error("در برقراری ارتباط مشکلی به وجود آمده است 🥲");
    }
  };
  return (
    <div>
      {data?.map((todo) => {
        const color = () => {
          switch (todo.status) {
            case "done":
              return styles.done;
            case "todo":
              return styles.todo;
            case "inProgress":
              return styles.inProgress;
            case "review":
              return styles.review;
          }
        };
        return (
          <div key={todo._id} className={styles.card}>
            <span className={color()}></span>
            <RiMastodonLine />
            <h4>{todo.title}</h4>
            <div className={styles.buttons}>
              {back && (
                <button
                  onClick={() => changeHandeler(todo._id, back)}
                  className={styles.back}
                >
                  <FaArrowAltCircleRight />
                  برگشت
                </button>
              )}
              {next ? (
                <button
                  onClick={() => changeHandeler(todo._id, next)}
                  className={styles.next}
                >
                  بعدی
                  <FaArrowAltCircleLeft />
                </button>
              ) : (
                <button
                  onClick={() => deleteHandler(todo._id)}
                  className={styles.delete}
                >
                  پاک کردن
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Tasks;
