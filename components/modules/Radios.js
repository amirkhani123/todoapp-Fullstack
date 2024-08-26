import styles from "./radios.module.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsAlignEnd, BsAlignStart } from "react-icons/bs";
import { IoMdDoneAll } from "react-icons/io";
import { IoSettings } from "react-icons/io5";

function Radios({ status, setStatus }) {
  return (
    <div className={styles.container}>
      <div className={styles.radios}>
        <div>
          <BsAlignEnd />
          <lable htmlFor="todo">شروع</lable>
        </div>
        <input
          type="radio"
          value="todo"
          id="todo"
          checked={status === "todo"}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className={styles.radios}>
        <div>
          <IoSettings />
          <lable htmlFor="inProgress">درحال انجام</lable>
        </div>
        <input
          type="radio"
          value="inProgress"
          id="inProgress"
          checked={status === "inProgress"}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className={styles.radios}>
        <div>
          <AiOutlineFileSearch />
          <lable htmlFor="review">درحال بررسی</lable>
        </div>
        <input
          type="radio"
          value="review"
          id="review"
          checked={status === "review"}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className={styles.radios}>
        <div>
          <IoMdDoneAll />
          <lable htmlFor="done">انجام شده</lable>
        </div>
        <input
          type="radio"
          value="done"
          id="done"
          checked={status === "done"}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Radios;
