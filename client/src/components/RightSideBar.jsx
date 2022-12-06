import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import CategoryService from "../services/CategoryService";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const RightSideBar = () => {
  const { categoryStore, postStore } = useContext(Context);
  const [categoriesFilterArr, setCategoriesFilterArr] = useState([]);
  const [categories, setCategories] = useState([]);
  const filters = postStore.filters;
  let tempCategoriesFilter = [];

  async function getPosts() {
    try {
      await postStore.fetchPosts(postStore.filters);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    async function FetchData() {
      // console.log(categoryStore.categories);
      // setCategories(categoryStore.categories);
      // console.log(categories);
      const response1 = await CategoryService.fetchCategories();
      setCategories(response1.data);
    }
    FetchData();
  }, []);
  console.log(categoriesFilterArr);
  // console.log(postStore.filters)
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4 style={{ marginLeft: "40%", marginTop: "1em" }}>Filter categories</h4>
      <ToggleButtonGroup
        type="checkbox"
        className="mb-2"
        style={{
          display: "block",
          flexDirection: "column",
          width: "100%",
          marginLeft: "20%",
        }}
      >
        {categories.map((category) => (
          // <OverlayTrigger
          //   placement="right"
          //   delay={{ show: 250, hide: 400 }}
          //   overlay={<Tooltip id="button-tooltip"></Tooltip>}
          // >
            <ToggleButton
              key={category.id}
              id={`category ${category.id}`}
              value={category.id}
              //   style={{backgroundColor:"orange", borderColor: "orange", borderRadius: "80px"}}
              name="bebraButton"
              variant="outline-warning"
              style={{ width: "45%", borderRadius: "90px", margin: "5px" }}
              onChange={(e) => {
                if (
                  categoriesFilterArr &&
                  categoriesFilterArr.includes(e.currentTarget.value)
                ) {
                  setCategoriesFilterArr(
                    categoriesFilterArr.filter(
                      (category) => category != e.currentTarget.value
                    )
                  );
                  // console.log(categoriesFilterArr);
                } else {
                  // console.log(e.currentTarget.value);

                  if (categoriesFilterArr.length > 0) {
                    setCategoriesFilterArr([
                      ...categoriesFilterArr,
                      e.currentTarget.value,
                    ]);
                  } else {
                    // console.log(categoriesFilterArr);

                    setCategoriesFilterArr([
                      ...categoriesFilterArr,
                      e.currentTarget.value,
                    ]);
                    // console.log(categoriesFilterArr);

                    setCategoriesFilterArr([
                      ...categoriesFilterArr,
                      e.currentTarget.value,
                    ]);
                  }

                  // console.log(categoriesFilterArr);
                }
              }}
            >
              {category.title}
            </ToggleButton>
          // </OverlayTrigger>
        ))}
      </ToggleButtonGroup>
      <Button
        variant="warning"
        style={{
          marginBottom: "0.5em",
          marginTop: "0.5em",
          width: "100%",
          marginLeft: "18%",
        }}
        onClick={() => {
          // console.log("here");
          postStore.setFilters({
            ...filters,
            categoriesFilter: categoriesFilterArr,
            page: 1,
          });
          // console.log(postStore.filters);
          getPosts();
          // console.log(tempCategoriesFilter);
        }}
      >
        Use Filters
      </Button>
    </div>
  );
};

export default observer(RightSideBar);

// {radios.map((radio, idx) => (
//     <ToggleButton
//       key={idx}
//       id={`radio-${idx}`}
//       type="radio"
//       variant="outline-warning"
//       // name="radio"
//       name={radio.name}
//       value={radio.value}
//       checked={radioValue === radio.value}
//       onChange={(e) => {
//         setRadioValue(e.currentTarget.value);
//         setRadioName(e.currentTarget.name);
//         postStore.setFilters({...filters, sort: e.currentTarget.value, page: 1})
//         getPosts();
//       }}
//     >
//       {radio.name}
//     </ToggleButton>
//   ))}
