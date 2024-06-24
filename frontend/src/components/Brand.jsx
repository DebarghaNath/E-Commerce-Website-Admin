import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import "./Dashboard.css"

const Addbrand = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [ses, setSes] = useState(null);
  const [dis, setDis] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [brandsPerPage] = useState(5);

  useEffect(() => {
    const scripts = [
      "../../assets/js/plugin/chart.js/chart.min.js",
      "../../assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js",
      "../../assets/js/plugin/chart-circle/circles.min.js",
      "../../assets/js/plugin/datatables/datatables.min.js",
      "../../assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
      "../../assets/js/plugin/sweetalert/sweetalert.min.js",
      "../../assets/js/kaiadmin.min.js",
      "../../assets/js/setting-demo.js",
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

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:3000/checkSession", {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (res.data.isLoggedIn == true) {
          setSes(true);
        }
      } catch (err) {
        console.log(err);
      }
      const table = await axios.get("http://localhost:3000/brandtable", {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      setDis(table.data);
    }
    fetch();
  }, []);

  const clickHandler = async () => {
    const res = await axios.get("http://localhost:3000/logout", {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (res.data.success) {
      navigate("/");
    }
  }

  const changeHandler = (event) => {
    setData(event.target.value);
  }

  const submitHandler = async () => {
    const res = await axios.post("http://localhost:3000/brand", { data: data }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })

    if (res.data == true) {
      window.location.reload();
      setData("");
    } else if (res.data == false) {
    } else {
      document.getElementById("name").innerHTML = res.data[0].name;
    }
  }

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * brandsPerPage;
  const currentBrands = dis.slice(offset, offset + brandsPerPage);
  const pageCount = Math.ceil(dis.length / brandsPerPage);

  if (ses === null) {
    return (
      <div className="invalid">
        <h1>UNAUTHORISED ADMIN</h1>
      </div>
    );
  } else if (ses === true) {
    return (
      <div className="wrapper">
        <div className="sidebar" data-background-color="dark">
          <div className="sidebar-logo">
            <div className="logo-header" data-background-color="dark">
              <a href="index.html" className="logo">
                <img src="assets/img/kaiadmin/logo_light.svg" alt="navbar brand" className="navbar-brand" height="20" />
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
          </div>
          <div className="sidebar-wrapper scrollbar scrollbar-inner">
            <div className="sidebar-content">
              <ul className="nav nav-secondary">
                <li className="nav-item active">
                  <a data-bs-toggle="collapse" href="#dashboard" className="collapsed" aria-expanded="false">
                    <i className="fas fa-home"></i>
                    <p>MASTER</p>
                    <span className="caret"></span>
                  </a>
                  <div className="collapse" id="dashboard">
                    <ul className="nav nav-collapse">
                      <li className='submenu'>
                        <a>
                          <span className="sub-item" title='addbrand' >ADD BRAND</span>
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
                                <span class="sub-item" title="addtype" >ADD CATEGORY</span>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <span class="sub-item" title="addsubcategory" >ADD SUB CATEGORY</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className='submenu'>
                        <a>
                          <span className="sub-item" title='addproductdetail'>ADD PRODUCT DETAILS</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="main-panel">
          <div className="main-header">
            <div className="main-header-logo">
              <div className="logo-header" data-background-color="dark">
                <a href="index.html" className="logo">
                  <img src="assets/img/kaiadmin/logo_light.svg" alt="navbar brand" className="navbar-brand" height="20" />
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
            </div>
            <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
              <div className="container-fluid">
                <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
                  <li className="nav-item topbar-user dropdown hidden-caret">
                    <a className="dropdown-toggle profile-pic" data-bs-toggle="dropdown" href="#" aria-expanded="false">
                      <div className="avatar-sm">
                        <img src="assets/img/profile.jpg" alt="..." className="avatar-img rounded-circle" />
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
                              <img src="assets/img/profile.jpg" alt="image profile" className="avatar-img rounded" />
                            </div>
                            <div className="u-text">
                              <h4>Hizrian</h4>
                              <p className="text-muted">hello@example.com</p>
                              <a href="profile.html" className="btn btn-xs btn-secondary btn-sm">View Profile</a>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">My Profile</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" onClick={clickHandler}>Logout</a>
                        </li>
                      </div>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="container">
            <div className="page-inner">
              <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4">
                <div>
                  <h3 className="fw-bold mb-3">ADD NEW BRANDS HERE</h3>
                </div>
              </div>
              <div className="row">
                <div className='row form'>
                  <div class="col-sm-14 col-md-14">
                    <div class="card card-round">
                      <div class="card-header">
                        <div class="card-title">Add Brands</div>
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
                            <table id="basic-datatables" class="display table table-striped table-hover">
                              <thead>
                                <tr>
                                  <th>Brand_id</th>
                                  <th>Brand_Name</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentBrands.map((brand) => (
                                  <tr key={brand.brand_id}>
                                    <td>{brand.brand_id}</td>
                                    <td>{brand.brand_name}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <ReactPaginate
                              previousLabel={"previous"}
                              nextLabel={"next"}
                              breakLabel={"..."}
                              breakClassName={"break-me"}
                              pageCount={pageCount}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={5}
                              onPageChange={handlePageClick}
                              containerClassName={"pagination"}
                              subContainerClassName={"pages pagination"}
                              activeClassName={"active"}
                            />
                          </div>
                        </div>
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

export default Addbrand;
