import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';
function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
 // Corrected the field name to "geolocation"
  });
  let navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
   // Corrected the key name to "geolocation"
      }),
    });
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    if (json.success) {
      localStorage.setItem('userEmail',credentials.email)
      localStorage.setItem('authToken', json.authToken);

     
     navigate("/")
    }
  };

  const onChangeHandler = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <div>
    <Navbar />
    </div>
       <div className="container" >
      <form onSubmit={handleSubmit} className='w-50 m-auto mt-5 border bg-dark border-success rounded'>

        <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChangeHandler}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="m-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" className=" m-3 btn btn-success">
          Submit
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">
          I'm a new User
        </Link>
      </form>
    </div>
    </div>
  )
}

export default Login
