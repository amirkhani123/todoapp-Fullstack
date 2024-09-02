import React from "react";
import AddTodoPage from "../components/templates/AddTodoPage";

function AddTodo() {
  return (
    <div>
      <AddTodoPage />
    </div>
  );
}

export default AddTodo;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: { destination: "/auth/signin" },
    };
  }
  return {
    props: {
      token,
    },
  };
}
