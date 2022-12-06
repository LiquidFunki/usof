import React, { useContext } from "react";
import UserCard from "./UserCard";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const UserList = ({ userList }) => {
  const { userStore } = useContext(Context);

  return (
    <>
      {
        // userStore.users.length ?
        // userStore.users.map((user) =>(
        //   <UserCard user = {user} key={user.id}/>
        // ))
        userList.length ? (
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {userList.map((user) =>(
            <UserCard user={user} key={user.id} />
            ))}
          </div>
        ) : (
          <span>No users found</span>
        )
      }
    </>
  );
};

export default observer(UserList);
