import React from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <div className="container">
          <a className="navbar-brand" href="#" style={{ fontFamily: 'Roboto', fontSize: '24px' }}>
            <span style={{ color: 'green' }}>Canteen</span>{" "}
            <span style={{ color: 'red' }}>Care</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/login" style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', padding: '5px 15px', borderRadius: '50px', background: 'black', marginRight: '10px', border: '2px solid yellow' }}>Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signup" style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px', padding: '5px 15px', borderRadius: '50px', background: 'black', border: '2px solid red', marginLeft: '50px' }}>Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="home">
        <h1>Welcome to Our Canteen</h1>
        <div className="text-center mt-5">
        <a href="/login" className="btn btn-lg btn-primary" style={{ width: '150px' }}>Order Now</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
