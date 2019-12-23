import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, ListGroup, Dropdown } from 'react-bootstrap';

export default function JobForm(props) {
  console.log(props)
  return (
    <Form>
      <Form.Group className="title" controlId="formBasicEmail">
        <Form.Label className="title_label">Job Name</Form.Label>
        <Form.Control className="input_box" type="text" placeholder="Enter Job Title" value={props.jobTitle || ''} onChange={(event) => props.jobTitleInput(event.target.value)} />
        <Form.Label className="title_label title_label_tiny">City</Form.Label>
        <Form.Control className="input_box" type="text" placeholder="City" value={props.location || ''} onChange={(event) => props.joblLocationInput(event.target.value)} />
        <Form.Label className="title_label title_label_tiny">Radius</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.radius}
          </Dropdown.Toggle>
          <Dropdown.Menu  >
            <Dropdown.Item href="#/action-1" eventKey='within 25 miles' onSelect={(evt) => { props.chooseRadius(evt) }} >within 25 miles</Dropdown.Item>
            <Dropdown.Item href="#/action-2" eventKey='within 50 miles' onSelect={(evt) => { props.chooseRadius(evt) }}>within 50 miles</Dropdown.Item>
            <Dropdown.Item href="#/action-3" eventKey='within 75 miles' onSelect={(evt) => { props.chooseRadius(evt) }}>within 75 miles</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Label className="title_label title_label_tiny">Show</Form.Label>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {props.jobNum}
          </Dropdown.Toggle>
          <Dropdown.Menu  >
            <Dropdown.Item href="#/action-1" eventKey='5 jobs' onSelect={(evt) => { props.shownJobNum(evt) }} >5 jobs</Dropdown.Item>
            <Dropdown.Item href="#/action-2" eventKey='10 jobs' onSelect={(evt) => { props.shownJobNum(evt) }}>10 jobs</Dropdown.Item>
            <Dropdown.Item href="#/action-3" eventKey='15 jobs' onSelect={(evt) => { props.shownJobNum(evt) }}>15 jobs</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button className="submit_btn" variant="primary" onClick={props.submitSearch}>
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}