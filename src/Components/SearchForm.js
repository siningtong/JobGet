import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, ListGroup, Dropdown, Spinner } from 'react-bootstrap';
import '../App.css';


export default function SearchFrom() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState('within 25 miles');
  const [jobNum, setJobNum] = useState('5 jobs');
  const [page, setPage] = useState('1');
  const [disabled, setDisabled] = useState(false);
  const [jobResults, setJobResults] = useState([]);
  //choose radius
  function chooseRadius(distance) {
    setRadius(distance);
  }
  const jobDistance = radius.split(' ')[1]
  //choose jon number shown
  function shownJobNum(num) {
    setJobNum(num);
  }
  //go to next page
  function nextPage() {
    const goNextPage = (Number(page) + 1).toString();
    setPage(goNextPage);
    submitSearch();
  }
  //go to previous page
  function previousPage() {
    if (page === '1') {
      setDisabled(true);
    } else {
      const goPreviousPage = (Number(page) - 1).toString();
      setPage(goPreviousPage);
      submitSearch();
    };
  };
  const jobSearchNum = jobNum.split(' ')[0];

  function submitSearch() {
    const searchLocation = location.split(' ').join("%20")
    axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${jobTitle}%20Job&location=${searchLocation}&radius_miles=${jobDistance}&days_ago=&jobs_per_page=${jobSearchNum}&page=${page}&api_key=mthpyw9ea7zyswfuj3zur6bt55fce7qf`)
      .then((res) => {
        setJobResults(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  if (jobResults.length === 0) {
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  };

  return (
    <div>
      <div>
        <Form>
          <Form.Group className="title" controlId="formBasicEmail">
            <Form.Label className="title_label">Job Name</Form.Label>
            <Form.Control className="input_box" type="text" placeholder="Enter Job Title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
            <Form.Label className="title_label title_label_tiny">City</Form.Label>
            <Form.Control className="input_box" type="text" placeholder="City" value={location} onChange={(event) => setLocation(event.target.value)} />
            <Form.Label className="title_label title_label_tiny">Radius</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {radius}
              </Dropdown.Toggle>
              <Dropdown.Menu  >
                <Dropdown.Item href="#/action-1" eventKey='within 25 miles' onSelect={(evt) => { chooseRadius(evt) }} >within 25 miles</Dropdown.Item>
                <Dropdown.Item href="#/action-2" eventKey='within 50 miles' onSelect={(evt) => { chooseRadius(evt) }}>within 50 miles</Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey='within 75 miles' onSelect={(evt) => { chooseRadius(evt) }}>within 75 miles</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Label className="title_label title_label_tiny">Show</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {jobNum}
              </Dropdown.Toggle>
              <Dropdown.Menu  >
                <Dropdown.Item href="#/action-1" eventKey='5 jobs' onSelect={(evt) => { shownJobNum(evt) }} >5 jobs</Dropdown.Item>
                <Dropdown.Item href="#/action-2" eventKey='10 jobs' onSelect={(evt) => { shownJobNum(evt) }}>10 jobs</Dropdown.Item>
                <Dropdown.Item href="#/action-3" eventKey='15 jobs' onSelect={(evt) => { shownJobNum(evt) }}>15 jobs</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button className="submit_btn" variant="primary" onClick={submitSearch}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div>
        {jobResults.map((jobResult, index) => {
          return (
            <ListGroup className="list_group" key={index} >
              <ListGroup.Item className="list_item job_title">{jobResult.name}</ListGroup.Item>
              <ListGroup.Item className="list_item company_location">{jobResult.hiring_company.name}</ListGroup.Item>
              <ListGroup.Item className="list_item company_location">{jobResult.location}</ListGroup.Item>
              <ListGroup.Item className="list_item description">Description:<p>{jobResult.snippet}</p></ListGroup.Item>
              <ListGroup.Item className="list_item industry">Industry:{jobResult.industry_name}</ListGroup.Item>
            </ListGroup>
          )
        })}
      </div>
      <div className="page_group">
        <Button className="page_btn" disabled={false} variant="primary" onClick={previousPage}>{'<'}</Button>
        <Button className="page_btn" variant="primary" onClick={nextPage}>{'>'}</Button>
      </div>
    </div>
  );
}

