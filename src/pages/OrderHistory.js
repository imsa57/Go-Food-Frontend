import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [myOrderData, setMyOrderData] = useState(null);
  const apiCall = async (email) => {
    const res = await fetch(
      "https://food-app-one-lyart.vercel.app/order/myorderdata",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      }
    );
    const data = await res.json();
    console.log(data);

    if (Array.isArray(data)) {
      setMyOrderData(data.reverse());
    } else {
      setMyOrderData(data);
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    apiCall(email);
  }, []);
  return (
    <div>
      <div style={{ margin: "100px auto" }}>
        <h1 className="text-center text-success fst-italic">My Orders</h1>
        {Array.isArray(myOrderData) ? (
          myOrderData?.map((item, index) => (
            <div className="container m-auto mt-3 table-responsive  table-responsive-sm table-responsive-md">
              <table
                className="table "
                style={{ border: "3px solid green" }}
                key={index}
              >
                <thead className=" text-success fs-5">
                  <tr>
                    <th>Time : {item.Time}</th>
                  </tr>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Size</th>
                    <th scope="col">QTY</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody style={{ color: "black" }}>
                  {item.items?.map((i, index) => (
                    <tr key={index}>
                      <td>{i.name}</td>
                      <td>{i.price}</td>
                      <td>{i.size}</td>
                      <td>{i.qty}</td>
                      <td>{i.price}</td>
                    </tr>
                  ))}

                  <tr>
                    <td className="fs-4 text-success">
                      Total Price: {item.Tota_Price} /-
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <h2 className="text-center fw-bold fs-2 my-5">{myOrderData}</h2>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
