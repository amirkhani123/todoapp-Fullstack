import { useState } from "react";
import styles from "./detailsUser.module.css";
import Form from "./Form";
function DetailsUser({ data }) {
  const [isEdite, setIsEdite] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p>
          نام کاربری : <span>{data.userName}</span>
        </p>
        <p>
          نام : <span>{data.name}</span>
        </p>
        <p>
          نام خانوادگی: <span>{data.lastName}</span>
        </p>
      </div>
      <div>
        <button onClick={() => setIsEdite(!isEdite)}>
          {isEdite ? "لغو کردن " : "ویرایش اطلاعات کاربری"}
        </button>
      </div>
      {isEdite && (
        <div className={styles.edite}>
          <Form textButton="ویرایش" />
        </div>
      )}
    </div>
  );
}

export default DetailsUser;
