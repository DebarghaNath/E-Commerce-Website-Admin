import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Dashboard.css"





const Add= () => {
  const navigate = useNavigate();
  const [data,setData] = useState("");
  const [finalval, setFinalval] = useState([
    {
      product_id:"",
      product_name: "",
      product_brand: "",
      product_category: "",
      product_sub_category: "",
      product_price: "",
      product_image: "",
      product_stock_count: "",
      product_discount: ""
    }
  ]);
  const [ses,setSes] = useState(null);
  const [val,setVal] = useState("");
  const [sub,setSub] = useState("");
  const [cat,setCat] = useState("");
  const [subcat,setSubcat] = useState("");
  const [brandName,setBrandName] = useState("");
  const [brandval,setBrandval] = useState("");
  const [fileName, setFileName] = useState("");
  const [brandprice,setBrandprice] = useState("");
  const [brandcount,setBrandcount] = useState("");
  const [brandiscount,setBrandiscount] = useState("");
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

      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);
useEffect(()=>{
  const fetch= async ()=>
    {
      try
      {
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
useEffect(()=>
    {
        const fetch= async ()=>
            {
                const value = await axios.get("http://localhost:3000/brandtable",{
                    headers:{
                          'Content-Type': 'application/json'
                        },
                      withCredentials: true
                });

                setData(value.data);

            }

        fetch();
    },[]);
    useEffect(()=>
        {
            const fetch= async ()=>
                {
                    const value = await axios.get("http://localhost:3000/brandtype",{
                        headers:{
                              'Content-Type': 'application/json'
                            },
                          withCredentials: true
                    });
                    setVal(value.data)
                }
                
    
            fetch();
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
const clickHandler1 =(event)=>
{        
    navigate(`/${event.target.title}`);
}

const handleChange = async (event)=>
    {
        console.log(event.target.value);
        const ax = await axios.post("http://localhost:3000/d",{data:event.target.value},{
            headers:{
                  'Content-Type': 'application/json'
                },
              withCredentials: true
        });
        setSub(ax.data);
    }
const changeBrand =(event)=>
    {
        setBrandName(event.target.value);
        setFinalval([
          {
            product_name: brandName,
            product_brand: brandval,
            product_category: cat,
            product_sub_category: subcat,
            product_price: brandprice,
            product_image: fileName,
            product_stock_count: brandcount,
            product_discount: brandiscount
          }
        ]);
    }
const changePrice =(event)=>
{
    setBrandprice(event.target.value);
}
const changeCount =(event)=>
{
    setBrandcount(event.target.value);
    setFinalval([
      {
        product_name: brandName,
        product_brand: brandval,
        product_category: cat,
        product_sub_category: subcat,
        product_price: brandprice,
        product_image: fileName,
        product_stock_count: brandcount,
        product_discount: brandiscount
      }
    ]);
}
const changeDiscount =(event)=>
{
    setBrandiscount(event.target.value);
    setFinalval([
      {
        product_name: brandName,
        product_brand: brandval,
        product_category: cat,
        product_sub_category: subcat,
        product_price: brandprice,
        product_image: fileName,
        product_stock_count: brandcount,
        product_discount: brandiscount
      }
    ]);
}
const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setFinalval([
      {
        product_name: brandName,
        product_brand: brandval,
        product_category: cat,
        product_sub_category: subcat,
        product_price: brandprice,
        product_image: fileName,
        product_stock_count: brandcount,
        product_discount: brandiscount
      }
    ]);
  };
const brand =(event)=>
{
    setBrandval(event.target.value);
    setFinalval([
      {
        product_name: brandName,
        product_brand: brandval,
        product_category: cat,
        product_sub_category: subcat,
        product_price: brandprice,
        product_image: fileName,
        product_stock_count: brandcount,
        product_discount: brandiscount
      }
    ]);
}
const changeSub=(event)=>
{
    setSubcat(event.target.value);
    setCat(sub[0].category_id);
    setFinalval([
      {
        product_name: brandName,
        product_brand: brandval,
        product_category: cat,
        product_sub_category: subcat,
        product_price: brandprice,
        product_image: fileName,
        product_stock_count: brandcount,
        product_discount: brandiscount
      }
    ]);
}
const final=()=>
{
  setFinalval([
    {
      product_name: brandName,
      product_brand: brandval,
      product_category: cat,
      product_sub_category: subcat,
      product_price: brandprice,
      product_image: fileName,
      product_stock_count: brandcount,
      product_discount: brandiscount
    }
  ]);
      // This will reload the current window
  //window.location.reload();

    
}
const submit=async ()=>
    {
      console.log(finalval);
        const ax = await axios.post("http://localhost:3000/submit",{finalval},{
            headers:{
                  'Content-Type': 'application/json'
                },
              withCredentials: true
        });
        
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
                        <span className="sub-item" title='addbrand' onClick={clickHandler1}>ADD BRAND</span>
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
                              <span class="sub-item" title="addtype" onClick={clickHandler1}>ADD CATEGORY</span>
                            </a>
                          </li>
                          <li>
                          <a href="#">
                              <span class="sub-item" title ="addsubcategory" onClick={clickHandler1}>ADD SUB CATEGORY</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className='submenu'>
                      <a>
                        <span className="sub-item" title='addproductdetail' onClick={clickHandler1}>ADD PRODUCT DETAILS</span>
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
                <h3 className="fw-bold mb-3">ADD PRODUCT DETAILS HERE</h3>

              </div>
              
            </div>
            <div className="row">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <div class="card-title">ADD PRODUCT DETAILS</div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="brand-select">Select Brand</label>

                                                <select class="form-select" id="select-brand" onChange={brand} >
                                                <option value = "">--select--</option>
                                                   {data.map((data)=>
                                                   (
                                                    <option key = {data.brand_id} value = {data.brand_id}>{data.brand_name}</option>
                                                   ))}
                                                </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">    
                                        <label for="exampleFormControlSelect1">Select Type</label>
                                            <select class="form-select" id="exampleFormControlSelect1" onChange={handleChange}>
                                            <option value="">--select--</option>
                                                {val.map((val)=>
                                                (
                                                    <option key = {val.category_id} value={val.category_id}>{val.category_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1">Example select</label>
                                            <select class="form-select" id="exampleFormControlSelect1" onChange={changeSub} >
                                                <option value="">--select--</option>
                                                {sub && sub.map((sub)=>
                                                (
                                                    <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.subcategory_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="email2">Product Name</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="email2"
                                                placeholder="enter..."
                                                value={brandName}
                                                onChange={changeBrand}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="email2">Upload image</label>
                                            <input
                                                type="file"
                                                class="form-control-file"
                                                id="exampleFormControlFile1"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="email2">Product Price</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="email2"
                                                placeholder="enter..."
                                                value={brandprice}
                                                onChange={changePrice}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="email2">Product Count</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="email2"
                                                placeholder="enter..."
                                                value={brandcount}
                                                onChange={changeCount}
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6">
                                        <div class="form-group">
                                            <label for="email2">Product Discount</label>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="email2"
                                                placeholder="enter..."
                                                value={brandiscount}
                                                onChange={changeDiscount}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-action">
                                <button class="btn btn-success" onClick={()=>{final();submit();}}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
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
export default Add;
/*

*/