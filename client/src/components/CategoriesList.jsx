import React, { useContext } from "react";
import CategoryCard from "./CategoryCard";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const CategoriesList = ({ CategoriesList }) => {
  const { userStore } = useContext(Context);

  return (
    <>
      {
        // userStore.users.length ?
        // userStore.users.map((user) =>(
        //   <UserCard user = {user} key={user.id}/>
        // ))
        CategoriesList.length ? (
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {CategoriesList.map((category) =>(
            <CategoryCard category={category} key={category.id} />
            ))}
          </div>
        ) : (
          <span>No categories found</span>
        )
      }
    </>
  );
};

export default observer(CategoriesList);
