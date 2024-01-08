import React,{useState,useRef,useEffect} from "react";
import { useDispatchCart,useCart} from "./ContextReducer";
function Card(props) {
  let dispatch=useDispatchCart();
  let data=useCart();
  const priceRef=useRef();
  let options = props.options;
  let foodItem = props.item;
  let priceOptions = Object.keys(options);
  const [qty,setqty]=useState(1);
  const[size,setSize]=useState("");
const handlecart= async ()=>{
  let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length!==0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
await  dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
console.log(data)
}
let finalPrice=qty*parseInt(options[size])
useEffect(()=>{
  setSize(priceRef.current.value);
},[])
  return (
    <div className="mt-3">
      <div className="card bg-dark text-light" style={{ maxWidth: "18rem" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <div className="card-body" >
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="d-flex align-items-center">
            <select className="form-select bg-success text-light rounded me-2" onChange={(e)=> setqty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="form-select bg-success text-light rounded me-2" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
<button className="btn btn-success justify-center ms-2" onClick={handlecart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
