import { GrAddCircle } from "react-icons/gr";
import styles from "./styles/addTodoPage.module.css";
import Radios from "../modules/Radios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AddTodoPage() {
  const [status, setStatus] = useState("todo");
  const [title, setTitle] = useState("");
  const addTodoHandler = async () => {
    const res = await fetch("/api/todo", {
      method: "POST",
      body: JSON.stringify({ title, status }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.status === "success") {
      toast.success("با موفقیت اضافه شد 😀");
      setTitle("");
      setStatus("todo");
    } else {
      toast.error("متاسفانه اضافه نشد 🥲");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <GrAddCircle />
        <h2>اضافه کردن یک کار جدید</h2>
      </div>
      <div className={styles.input}>
        <label>عنوان :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.radios}>
        <Radios status={status} setStatus={setStatus} />
      </div>
      <button onClick={addTodoHandler}>اضافه کردن</button>
    </div>
  );
}

export default AddTodoPage;
