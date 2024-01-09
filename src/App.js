import './App.css';
import Home from './Screens/Home';
import Signup from './Screens/Signup.js';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import Login from './Screens/Login';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { CartProvider } from './Components/ContextReducer.js';
import MyOrder from './Screens/MyOrder.js';

function App() {
  const [load, setLoad] = useState(true);
  setTimeout(() => {
    setLoad(false);
  }, 3500);

  return (
    
    <>
          {load ? (
        <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <img
          src="https://media.geeksforgeeks.org/wp-content/uploads/20200805182753/20200805182639.gif"
          alt="Loading..."
        
        />
         <h1 style={{
      fontFamily: 'Arial Black, sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      color: 'black',
      fontSize: '5rem',
      fontWeight: 600,
    }}>
      Go<span style={{ color: '#28a745' }}>Food</span>
    </h1>
      </div>
      ) : 
   <CartProvider>
     <Router>
      <div>
        <Routes>
          <Route exact path="/"  element={<Home/>}/>
          <Route exact path="/login"  element={<Login/>}/>
          <Route exact path="/createuser"  element={<Signup/>}/>
          <Route exact path="/myorder"  element={<MyOrder/>}/>
        </Routes>
        </div>
    </Router>
   </CartProvider>}
   </>
  );
}

export default App;
