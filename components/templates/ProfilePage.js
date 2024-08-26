import styles from "./styles/profilePage.module.css";
import { CgProfile } from "react-icons/cg";
import Form from "../modules/Form";
import { useEffect, useState } from "react";
import DetailsUser from "../modules/DetailsUser";
function ProfilePage() {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((result) => {
        if (result.status === "complete") {
          setData(result.data);
        }
      });
  }, []);
  return (
    <div className={styles.container}>
      <h2>
        <CgProfile />
        حساب کاربری
      </h2>
      <div>{data ? <DetailsUser data={data} /> : <Form textButton="تکمیل اطلاعات" />}</div>
    </div>
  );
}

export default ProfilePage;
