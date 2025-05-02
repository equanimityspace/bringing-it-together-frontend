import { useGetAllUsersQuery } from "../app/mainSlice";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Accordion } from "react-bootstrap";
import InfoModal from "./Modal";

const Home = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();  // get all users

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
              <Accordion>
                <div className="user-list">
                    {data ?(
                    data?.map((user) => (
                      <div
                        key={user.id}
                        className="user-info"
                       >
                        <Accordion.Item eventKey={user.id}>
                          <Accordion.Header className="user-info">{user.email} {user.firstName} {user.lastName}</Accordion.Header>
                            <Accordion.Body>
                              <Button variant="primary">Update User</Button>
                              <Button variant="primary">Delete User</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                      </div>
                    ))
                  ) : (
                      <h3> No users found </h3>
                    )}
                </div>
              </Accordion>  
    </article>
  );
};
export default Home;
