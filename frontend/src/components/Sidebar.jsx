import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

const Sidebar = () => {
  const [form, setForm] = useState(false);
  const [detail,setDetail] = useState(false);
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          ADMIN
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => 
          {
            setForm(!form)
            if(detail)
              setDetail(false);
          }
          }>ADD BRAND</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={() => 
          {
            setDetail(!detail)
            if(form)
              setForm(false);
          }}>ADD TYPE</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {form && (
        <Form>
          <Form.Label htmlFor="BrandName">BrandName</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          
        </Form>
      )}
      {detail && (
        <Form>
          <Form.Label htmlFor="Type">Type</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
          />
          <Form.Label htmlFor=""></Form.Label>
          
        </Form>
      )}
    </div>
  );
};

export default Sidebar;
