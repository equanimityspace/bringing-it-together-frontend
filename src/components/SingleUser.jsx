import React from "react";
import { useGetUserQuery } from "../app/mainSlice";
import { useParams } from "react-router-dom";

export default function SingleUser() {
  const { id } = useParams();
  const { data: user, error, isLoading } = useGetUserQuery(id);

  if (isLoading) return <p>Were grabing it, hang tight.</p>;
  if (error)
    return (
      <p>
        It's not working but it's definitly not our fault must be something you
        did.
      </p>
    );

  return (
    <div className="single-user">
      <h2>{user.firstName}</h2>
      <h2>{user.lastName}</h2>
      <h2>{user.email}</h2>
    </div>
  );
}
