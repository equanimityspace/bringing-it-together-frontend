import { useGetAllUsersQuery } from "../app/mainSlice";

const Home = () => {
  const { isLoading, isError, error } = useGetAllUsersQuery();  // get all users

  if (isLoading) {
    return <h1>isloading...</h1>;
  }

  if (isError) {
    return <h1>Error: {error?.status || "unknown error"}</h1>
  }

  return (
    <article>
        <h2>Our users</h2>
          <div className="user-list">
            {user.length > 0 ? (
            user.map((user) => (
                <div
                key={user.id}
                className="user-info"
                >
            <h3 className="user-info">{user.email}{user.firstName}{user.lastname}</h3>
            <Button variant="primary">Update User</Button>
            <Button variant="primary">Delete User</Button>
            </div>
            ))
        ) : (
            <h3> No users found </h3>
        )}
          </div>
    </article>
  );
};
export default Home;
