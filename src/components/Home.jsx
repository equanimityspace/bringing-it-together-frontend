import { useGetAllUsersQuery } from "../app/mainSlice";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Home = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();  // get all users
  console.log(data);


    // Modal logic
    const [response, setResponse] = useState();
    const [show, setShow] = useState(false);
  
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

  if (isLoading) {
    return <h1>isloading...</h1>;
  }

  if (isError) {
    openModal();
  }

  return (
    <article>
            {show ? (
              <InfoModal
                show={show}
                hide={closeModal}
                heading="Error"
                body={error?.status || "unknown error"}
              />
            ) : (
              <></>
            )}
        <h2>Our users</h2>
          <div className="user-list">
            {data?.length > 0 ? (
            data.map((user) => (
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
