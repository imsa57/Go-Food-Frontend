import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";

const Cart = ({ onClose }) => {
  const data = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();
  if (data.length === 0) {
    return (
      <div style={{ color: "red" }}>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleCheckOut = async () => {
    const email = localStorage.getItem("email");
    const objData = {
      email,

      orderData: {
        items: data,
        Tota_Price: totalPrice,
        Time: new Date().toLocaleString(),
      },
    };
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        const res = await fetch(
          "https://food-app-one-lyart.vercel.app/order/orderpost",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(objData),
          }
        );
        res.json().then((value) => {
          if (value.success) {
            dispatch({ type: "DONE" });
            navigate("/order");
            onClose();
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Size</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-white">
            {data?.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0 ">
                    <span
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                      className="text-white"
                      title="Delete item"
                    >
                      X
                    </span>
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-success">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-success text-white mt-5"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
