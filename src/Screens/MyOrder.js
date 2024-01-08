import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:4000/api/myOrderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });

    // await res.map((data)=>{
    //    console.log(data)
    // })
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData && orderData.orderData ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((item) => {
                return item.slice(1).map((arrayData, index) => (
                  <div key={index}>
                    {arrayData.order_date ? (
                      <div
                        className="m-auto mt-5 text-white d-flex"
                        key={index}
                      >
                        {orderData.order_date}
                        <hr />
                      </div>
                    ) : (<div className="d-flex" style={{display:"flex"}}>
                     <div className="col-12 col-md-6 col-lg-3" key={index}>
                        <div
                          className="card mt-3 d-flex"
                          style={{ width: "20rem", maxHeight: "400px" }}
                        >
                         
                          <div className="card-body">
                            
                            <h5 className="card-title">{arrayData.name}</h5>
                            <div
                              className="container w-100 p-0"
                              style={{ height: "220px" }}
                            >
                              <div className="text-success fs-4 m-0 fw-bold">Order Details:</div>
                               <div className=" text-black fs-5">
                                Date: {orderData.orderData.order_date.slice(0,10)}
                              </div>
                              <div className=" text-black fs-5">
                                Quantity: {arrayData.qty}
                              </div>

                              <div className="text-black fs-5">
                                Size: {arrayData.size}
                              </div>
                              <div className=" text-danger fw-bold fs-5">
                                {arrayData.name}
                              </div>
                              <br />
                              <btn className="text-white bg-success rounded p-3 fw-bold">
                                {" "}
                                Price: ₹{arrayData.price}/-
                              </btn>{" "}
                              {/* Assuming date property */}
                              <div className="d-inline ms-2 h-100 w-20 fs-4">
                                ₹{arrayData.price}/-
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                    </div>)
                     }
                  </div>
                ));
              })
          ) : (
            <div className="fs-4">No order data available</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
