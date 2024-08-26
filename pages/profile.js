import ProfilePage from "../components/templates/ProfilePage";

function Profile({ cookies }) {
  console.log(cookies);
  return (
    <div>
      <ProfilePage />
    </div>
  );
}

export default Profile;
export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: { destination: "/auth/signin" },
    };
  }
  return {
    props: {
      cookies: token,
    },
  };
}
