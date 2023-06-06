import React, { useEffect, useState } from "react";
import Card from "../components/card";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodItems, setFoodItems] = useState();
  const [foodCategory, setFoodCategory] = useState();

  const apiCall = async () => {
    const res1 = await fetch(
      "https://food-app-one-lyart.vercel.app/fooditems/"
    );
    const res2 = await fetch(
      "https://food-app-one-lyart.vercel.app/fooditems/category"
    );
    const foodItems = await res1.json();
    const foodCategory = await res2.json();
    setFoodItems(foodItems);
    setFoodCategory(foodCategory);
  };

  useEffect(() => {
    apiCall();
  }, []);
  return (
    <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner " id="carousel">
          <div className=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center">
              {" "}
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button
                className="btn text-white bg-danger"
                onClick={() => {
                  setSearch("");
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/900x700?burger"
              className="d-block w-100 p-1"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700?pizza"
              className="d-block w-100 p-1"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/900x700?sandwitch"
              className="d-block w-100 p-1"
              alt="..."
              style={{ filter: "brightness(30%)" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {foodCategory?.map((cat) => (
          <div key={cat._id} className="row mt-5">
            <h4 className="mb-2">{cat.CategoryName}</h4>

            {foodItems
              ?.filter(
                (item) =>
                  item.CategoryName === cat.CategoryName &&
                  item.name
                    .toLocaleLowerCase()
                    .includes(search.toLocaleLowerCase())
              )
              .map((item) => (
                <div key={item._id} className="col-12 col-md-6 col-lg-3">
                  <Card item={item} />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
