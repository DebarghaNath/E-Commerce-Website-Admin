import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import "./Navbar.css"
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [data, setData] = useState(
    [{id: '',name: '',color: '',file: ''}]
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/feed', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setData(res.data);
        console.log(res.data);
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>   
        <div>
          <ul className='app__navbar-links'  onClick={()=>{window.location.reload()}}>
              <li><Link to="/feed" className='link'>Feed </Link></li>
              <li><Link  to="/login" className='link'>Login/Register </Link></li>
          </ul>
        </div>
        <div className='app__navbar-smallscreen'>
          <GiHamburgerMenu className='menu' color='#fff' fontSize={27} onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className='app__navbar-smallscreen_overlay flex_center slide-bottom'>
                <MdHome fontSize={27} className='overlay_close' onClick={() => setToggleMenu(false)} />
                  <ul className='app__navbar-smallscreen-links' onClick={()=>{window.location.reload()}}>
                    <li><Link to="/feed">Feed</Link></li>
                    <li><Link to ="/login" onClick={()=>{window.location.reload()}}>Log In/Register</Link></li>
                  </ul>
            </div>
            )}
        </div>
      </div>
    </nav>
    <div className="card-container-navbar">
      {data.map((item, index) => (
        <div key={index} className="card-navbar">
          <p>
            <label className="card-label-navbar"><h2>Name: {item.name}</h2></label>
          </p>
          <p>
            <label className="card-label-navbar"><h3>Color: {item.color}</h3></label>
          </p>
          
          
          {item.file && <img src={require(`${item.file}`)} alt={`Image ${index}`} className="card-image-navbar" />}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Navbar;
