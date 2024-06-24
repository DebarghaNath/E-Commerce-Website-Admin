import React from 'react';
//import Sidebar from './Sidebar';
//import Header from './Header';
//import Tsidear from './Tsidear';

import { useEffect,useState } from 'react';
import axios from 'axios';
import Brand from './Brand';
import { useNavigate } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';
import "./Dashboard.css"





const Dashboard = () => {
  const navigate = useNavigate();
  const [data,setData] = useState("");
  const [ses,setSes] = useState(null);
  const [show,setShow] = useState(false);
  const [type,setType] = useState(false);
  const [add,setAdd] = useState(false);
  const [dis,setDis] = useState([]);
  useEffect(() => {
  const scripts = [
   // "../../assets/js/core/bootstrap.min.js",
    //"../../assets/js/core/jquery-3.7.1.min.js",
    //"../../assets/js/core/popper.min.js",
    //"../../assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
    "../../assets/js/plugin/chart.js/chart.min.js",
    "../../assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js",
    "../../assets/js/plugin/chart-circle/circles.min.js",
    "../../assets/js/plugin/datatables/datatables.min.js",
    "../../assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
    //"../../assets/js/plugin/jsvectormap/jsvectormap.min.js",
    //"../../assets/js/plugin/jsvectormap/world.js",
    "../../assets/js/plugin/sweetalert/sweetalert.min.js",
    "../../assets/js/kaiadmin.min.js",
    "../../assets/js/setting-demo.js",
    
    //"../../assets/js/demo.js"
  ];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    
    document.body.appendChild(script);
  });
  
  return () => {
    // Cleanup function to remove scripts when component unmounts
    scripts.forEach(src => {
      const script = document.querySelector(`script[src="${src}"]`);
      if (script) {
        document.body.removeChild(script);
      }
    });
  };
}, []);
useEffect(()=>{
  const fetch= async ()=>{
      try{
        const res = await axios.get("http://localhost:3000/checkSession",{
          headers:{
              'Content-Type': 'application/json'
          },
          withCredentials: true
      });
      console.log(res);
        if(res.data.isLoggedIn==true)
          {
            setSes(true);
          }
      }catch(err){
        console.log(err);
      }
  }
  fetch()
},[]);
const clickHandler= async ()=>
  {
    const res = await axios.get("http://localhost:3000/logout",{
      headers:{
          'Content-Type': 'application/json'
      },
      withCredentials: true
  });
  console.log(res.data.success);
  if(res.data.success)
    {
      navigate("/");
    }
  }
  const clickBrand= ()=>
  {
    navigate("/addbrand")
    setShow(!show);
    if(type===true)
    {
      setType(!type)
    }
    if(add==true)
    {
      setAdd(!add);
    }
  }
  const clickType= ()=>
  {
    navigate("/addtype")
    setType(!type);
    if(show===true)
    {
      setShow(!show)
    }
    if(add==true)
    {
      setAdd(!add);
    }
  }
  const clickSub= ()=>
    {
      navigate("/addsubcategory")
      setType(!type);
      if(show===true)
      {
        setShow(!show)
      }
      if(add==true)
      {
        setAdd(!add);
      }
    }
  const clickAdd= ()=>
  {
    navigate("/addproductdetail")
    setAdd(!add);
    if(show===true)
    {
       setShow(!show)
    }
    if(type===true)
      {
         setType(!type)
      }
  }
  
  const changeHandler=(event)=>
    {
      setData(event.target.value)
      console.log(data);
    }
  const submitHandler=async ()=>
    {
      const res = await axios.post("http://localhost:3000/brand",{data:data},{
        headers:{
            'Content-Type': 'application/json'
        },
        withCredentials: true
    })
    

    if(res.data==true)
      {
        setShow(!show);
        setData("")
      }
      else if(res.data==false)
        {
          
        }
        else
        {
          document.getElementById("name").innerHTML = res.data[0].name;
        }
    }
    const submitHandler1 =async ()=>
      {
        const res = await axios.post("http://localhost:3000/type",{type:data},{
          headers:{
              'Content-Type': 'application/json'
          },
          withCredentials: true
      })
      console.log(res);
      if(res.data==true)
        {
          setType(!type);
          setData("")
        }
        else if(res.data==false)
          {
            
          }
          else
          {
            document.getElementById("type").innerHTML = res.data[0].type;
          }
      }
      const fetchBrand =async ()=>
        {

          const table = await axios.get("http://localhost:3000/brandtable",{
            headers:{
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
          setDis(table.data);
        }

if(ses===null){

      return (
        <div className="invalid">
          <h1>UNAUTHORISED ADMIN</h1>
        </div>
      );
    }else if(ses===true){
  return (
    <div className="wrapper">

      {/* Sidebar */}
      <div className="sidebar" data-background-color="dark">
        <div className="sidebar-logo">
          {/* Logo Header */}
          <div className="logo-header" data-background-color="dark">
            <a href="index.html" className="logo">
            <img
                src="assets/img/kaiadmin/logo_light.svg"
                alt="navbar brand"
                className="navbar-brand"
                height="20"
              />
            </a>
            <div className="nav-toggle">
              <button className="btn btn-toggle toggle-sidebar">
                <i className="gg-menu-right"></i>
              </button>
              <button className="btn btn-toggle sidenav-toggler">
                <i className="gg-menu-left"></i>
              </button>
            </div>
            <button className="topbar-toggler more">
              <i className="gg-more-vertical-alt"></i>
            </button>
          </div>
          {/* End Logo Header */}
        </div>
        <div className="sidebar-wrapper scrollbar scrollbar-inner">
          <div className="sidebar-content">
            <ul className="nav nav-secondary">
              <li className="nav-item active">
                <a
                  data-bs-toggle="collapse"
                  href="#dashboard"
                  className="collapsed"
                  aria-expanded="false"
                >
                  <i className="fas fa-home"></i>
                  <p>MASTER</p>
                  <span className="caret"></span>
                </a>
                <div className="collapse" id="dashboard">
                  <ul className="nav nav-collapse">
                    <li className='submenu'>
                      <a>
                        <span className="sub-item" onClick={() => { clickBrand(); fetchBrand(); }}>ADD BRAND</span>
                      </a>
                    </li>
                    <li className='submenu'>
                    <a data-bs-toggle="collapse" href="#subnav1">
                        <span class="sub-item">ADD TYPE</span>
                        <span class="caret"></span>
                      </a>
                      <div class="collapse" id="subnav1">
                        <ul class="nav nav-collapse subnav">
                          <li>
                            <a href="#">
                              <span class="sub-item" onClick={clickType}>ADD CATEGORY</span>
                            </a>
                          </li>
                          <li>
                          <a href="#">
                              <span class="sub-item" title ="addsubcategory" onClick={clickSub}>ADD SUB CATEGORY</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className='submenu'>
                      <a>
                        <span className="sub-item" onClick={clickAdd}>ADD PRODUCT DETAILS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* End Sidebar */}

      <div className="main-panel">
        <div className="main-header">
          <div className="main-header-logo">
            {/* Logo Header */}
            <div className="logo-header" data-background-color="dark">
              <a href="index.html" className="logo">
                <img
                  src="assets/img/kaiadmin/logo_light.svg"
                  alt="navbar brand"
                  className="navbar-brand"
                  height="20"
                />
              </a>
              <div className="nav-toggle">
                <button className="btn btn-toggle toggle-sidebar">
                  <i className="gg-menu-right"></i>
                </button>
                <button className="btn btn-toggle sidenav-toggler">
                  <i className="gg-menu-left"></i>
                </button>
              </div>
              <button className="topbar-toggler more">
                <i className="gg-more-vertical-alt"></i>
              </button>
              
            </div>
            {/* End Logo Header */}
          </div>
          {/* Navbar Header */}
          <nav
            className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom"
          >
            <div className="container-fluid">
              <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                <li className="nav-item topbar-user dropdown hidden-caret">
                  <a
                    className="dropdown-toggle profile-pic"
                    data-bs-toggle="dropdown"
                    href="#"
                    aria-expanded="false"
                  >
                    <div className="avatar-sm">
                      <img
                        src="assets/img/profile.jpg"
                        alt="..."
                        className="avatar-img rounded-circle"
                      />
                    </div>
                    <span className="profile-username">
                      <span className="op-7">Hi,</span>
                      <span className="fw-bold">Hizrian</span>
                    </span>
                  </a>
                  <ul className="dropdown-menu dropdown-user animated fadeIn">
                    <div className="dropdown-user-scroll scrollbar-outer">
                      <li>
                        <div className="user-box">
                          <div className="avatar-lg">
                            <img
                              src="assets/img/profile.jpg"
                              alt="image profile"
                              className="avatar-img rounded"
                            />
                          </div>
                          <div className="u-text">
                            <h4>Hizrian</h4>
                            <p className="text-muted">hello@example.com</p>
                            <a
                              href="profile.html"
                              className="btn btn-xs btn-secondary btn-sm"
                              >View Profile</a>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">My Profile</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={clickHandler} >Logout</a>
                      </li>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
          {/* End Navbar */}
        </div>

        <div className="container">
          <div className="page-inner">
            <div
              className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4"
            >
              <div>
                <h3 className="fw-bold mb-3">Dashboard</h3>

              </div>
              
            </div>
            <div className="row">
            
              <div className="col-sm-6 col-md-3">
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-icon">
                        <div
                          className="icon-big text-center icon-primary bubble-shadow-small"
                        >
                          <i className="fas fa-users"></i>
                        </div>
                      </div>
                      <div className="col col-stats ms-3 ms-sm-0">
                        <div className="numbers">
                          <p className="card-category">Visitors</p>
                          <h4 className="card-title">1,294</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-icon">
                        <div
                          className="icon-big text-center icon-info bubble-shadow-small"
                        >
                          <i className="fas fa-user-check"></i>
                        </div>
                      </div>
                      <div className="col col-stats ms-3 ms-sm-0">
                        <div className="numbers">
                          <p className="card-category">Subscribers</p>
                          <h4 className="card-title">1303</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-icon">
                        <div
                          className="icon-big text-center icon-success bubble-shadow-small"
                        >
                          <i className="fas fa-luggage-cart"></i>
                        </div>
                      </div>
                      <div className="col col-stats ms-3 ms-sm-0">
                        <div className="numbers">
                          <p className="card-category">Sales</p>
                          <h4 className="card-title">$ 1,345</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div className="card card-stats card-round">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-icon">
                        <div
                          className="icon-big text-center icon-secondary bubble-shadow-small"
                        >
                          <i className="far fa-check-circle"></i>
                        </div>
                      </div>
                      <div className="col col-stats ms-3 ms-sm-0">
                        <div className="numbers">
                          <p className="card-category">Order</p>
                          <h4 className="card-title">576</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {show&&(
              <div className='row form'>
              <div class=" col-sm-14 col-md-14">
                <div class="card card-round">
                  <div class="card-header">
                    <div class="card-title" >Add Brands</div>

                    <div class="card-head-row">
                      <div class="card-body">
                    <div class="row">
                      <div class="col-md-14 col-lg-14">
                        <div class="form-group">
                          <label for="email2">Brand Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="email2"
                            placeholder="enter..."
                            value={data}
                            onChange={changeHandler}
                          />
                          <small id="name" class="form-text text-muted">We'll never share with anyone else.</small>
                        </div>
                        <button class="btn btn-success" onClick={submitHandler}>Submit</button>
                       </div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Brand Name Table</h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                id="basic-datatables"
              class="display table table-striped table-hover"
              >
              <thead>
                <tr>
                  <th>Brand_id</th>
                  <th>Brand_Name</th>    
                </tr>
                
              </thead>
              <tbody>
                    {dis.map((dis) => (
                        <tr key={dis.brand_id}>
                            <td>{dis.brand_id}</td>
                            <td>{dis.brand_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

            </div>

            )
            }
            {type&&(
              <div className='row form'>
                <div class=" col-sm-14 col-md-14">
                  <div class="card card-round">
                    <div class="card-header">
                      <div class="card-title">Add Types</div>
                      <div class="card-head-row">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-14 col-lg-14">
                              <div class="form-group">
                                <label for="email2">Type</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="email2"
                                  placeholder="enter..."
                                  value={data}
                                  onChange={changeHandler}
                                />
                                <small id="type" class="form-text text-muted">We'll never share with anyone else.</small>
                              </div>
                              <button class="btn btn-success" onClick={submitHandler1}>Submit</button>
                            </div>
                         </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>)
            }
            {add &&
            (
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">Form Elements</div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                        <label for="brand-select">Select Brand</label>
                            <select class="form-select" id="select-brand" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                        </div>
                      </div>
                      <div class="col-md-6 col-lg-6">
                        <div class="form-group">
 
                          <label for="exampleFormControlSelect1">Select Type</label>
                            <select class="form-select" id="exampleFormControlSelect1" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6 col-lg-6">
                        <div class="form-group">
 
                          <label for="exampleFormControlSelect1">Example select</label>
                            <select class="form-select" id="exampleFormControlSelect1" >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-action">
                    <button class="btn btn-success">Submit</button>
                    <button class="btn btn-danger">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

            )

            }
            </div> 
          </div>
        </div>
           
        <footer className="footer">
          <div className="container-fluid d-flex justify-content-between">
            <div className="copyright">
              2024, made with <i className="fa fa-heart heart text-danger"></i> by
              <a href="http://www.themekita.com">Debargha Nath</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
}
export default Dashboard;
/*

*/