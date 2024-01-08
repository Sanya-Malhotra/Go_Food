import React, { useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { useCart, useDispatchCart } from "../Components/ContextReducer";
import "../App.css";
export default function Cart() {
  const [showAlert, setShowAlert] = useState(false);
  const alertStyles = {
    color: "white",
    padding: "15px",
    borderRadius: "5px",
    display: showAlert ? "block" : "none",
    marginBottom: "20px",
    textAlign: "center",
  };
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        {showAlert ? (
          <div style={alertStyles}>
            <div class="payment-success">
              <svg
                class="checkmark"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                <circle
                  class="checkmark-circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class="checkmark-check"
                  fill="none"
                  d="M14 27l7 7 16-16"
                />
              </svg>
              <p style={{marginTop:"15px",fontWeight:"bold",fontSize:"20px"}}>Order Successfull!</p>
            </div>
          </div>
        ) : (
          <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
        )}
      </div>
    );
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:4000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log("JSON RESPONSE:::::", response.status);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row" className="text-white">
                  {index + 1}
                </th>
                <td className="text-white">{food.name}</td>
                <td className="text-white">{food.qty}</td>
                <td className="text-white">{food.size}</td>
                <td className="text-white">{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <IoMdTrash
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                      className="text-white"
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-success mt-5 text-white"
            onClick={() => {
              setShowAlert(true);
              setTimeout(() => {
                setShowAlert(false);
              }, 3000);
              handleCheckOut(); // Call the original function
            }}
          >
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
