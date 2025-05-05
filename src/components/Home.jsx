
import { useGetAllUsersQuery, useDeleteUserMutation} from "../app/mainSlice";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import InfoModal from "./Modal";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  // using navgate for update profile button
  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const { data, isLoading, isError, error } = useGetAllUsersQuery();  // get all users

    // Modal logic
    const [response, setResponse] = useState();
    const [show, setShow] = useState(false);

    //handleDelete for delete button
    const handleDelete = async (userId) => {
      try {
        await deleteUser(userId).unwrap();
      } catch (error) {
        console.error(error.message);
        openModal();
      }
    };


    // const handleDelete = (user) => {
    //   const { id } = user;
    //   const updatedUser = data?.filter(user => user.id !== id);
    //   setResponse({ message: `User ${user.firstName} ${user.lastName} successfully deleted`});
    //   openModal();
    // };
  
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

  if (isLoading) {
    return <h1>isloading...</h1>;
  }

  if (isError) {
    setResponse({ message: error?.status || "unknown error" });
    openModal();
  };

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
                              <Button variant="primary" onClick={() => navigate(`getUser/${user.id}`)}>Update User</Button>
                              <Button variant="primary" onClick={() => handleDelete(user?.id)}>Delete User</Button>
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