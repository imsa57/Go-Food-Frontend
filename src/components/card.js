import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = ({ item }) => {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const sizeRef = useRef();

  useEffect(() => {
    setSize(sizeRef.current.value);
  }, []);

  const priceOption = Object.keys(item?.options[0]);
  const dispatch = useDispatchCart();
  const Cart = useCart();

  let totalPrice = qty * +item.options[0][size];
  const handleAdd = async (item) => {
    const existingItem = Cart.find((i) => i.id === item._id);
    if (existingItem && existingItem.size === size) {
      await dispatch({
        type: "UPDATE",
        price: (existingItem.qty + +qty) * +item.options[0][size],
        qty: existingItem.qty + +qty,
        id: existingItem.id,
      });
      return;
    } else {
      await dispatch({
        type: "ADD",
        foodDetail: {
          id: item._id,
          name: item.name,
          size: size,
          price: +totalPrice,
          qty: +qty,
        },
      });
    }
  };

  return (
    <div className="card mt-3" style={{ width: "19rem", maxHeight: "450px" }}>
      <img
        src={item.img}
        className="card-img-top"
        alt="..."
        style={{ height: "150px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded text-white p-1 fs-5"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-success rounded text-white p-1 fs-5"
            onChange={(e) => setSize(e.target.value)}
            ref={sizeRef}
          >
            {priceOption.map((data, index) => (
              <option key={index} value={data} className="text-white">
                {data}
              </option>
            ))}
          </select>
          <div className="d-inline h-100 fs-5 fw-bold  mx-2">
            {totalPrice}/-
          </div>
        </div>
        <hr />
        <button
          className="btn bg-success text-white fs-5"
          onClick={() => handleAdd(item)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
