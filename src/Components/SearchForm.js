import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, ListGroup } from 'react-bootstrap';
import '../App.css'


export default function SearchFrom() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobResults, setJobResults] = useState([])

  function submitSearch() {

    const searchLocation = location.split(' ').join("%20")
    axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${jobTitle}%20Job&location=${searchLocation}&radius_miles=25&days_ago=&jobs_per_page=10&page=1&api_key=mthpyw9ea7zyswfuj3zur6bt55fce7qf`)
      .then((res) => {
        setJobResults(res.data.jobs)
        // console.log(jobResults[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  if (jobResults.length === 0) {
    return (
      <div >
        <Form>
          <Form.Group className="title" controlId="formBasicEmail">
            <Form.Label className="title_label">Job Name</Form.Label>
            <Form.Control className="input_box" type="text" placeholder="Enter Job Title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
            <Form.Label className="title_label title_label_tiny">City</Form.Label>
            <Form.Control className="input_box" type="text" placeholder="City" value={location} onChange={(event) => setLocation(event.target.value)} />

            <Button className="submit_btn" variant="primary" onClick={submitSearch}>
              Submit
            </Button>
          </Form.Group>
        </Form>

      </div>
    )
  }
  return (
    <div>
      <div>
        <Form>
          <Form.Group className="title" controlId="formBasicEmail">
            <Form.Label className="title_label">Job Name</Form.Label>
            <Form.Control className="input_box" type="text" placeholder="Enter Job Title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
            <Form.Label className="title_label title_label_tiny">City</Form.Label>
            <Form.Control className="input_box" type="text" placeholder="City" value={location} onChange={(event) => setLocation(event.target.value)} />
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
              <ListGroup.Item className="list_item description">Description:{jobResult.snippet}</ListGroup.Item>
              <ListGroup.Item className="list_item industry">Industry:{jobResult.industry_name}</ListGroup.Item>
            </ListGroup>
          )
        })}
      </div>
      <div className="page_group">
        <Button className="page_btn" variant="secondary">{'<'}</Button>
        <Button className="page_btn" variant="primary">1</Button>
        <Button className="page_btn" variant="secondary">2</Button>
        <Button className="page_btn" variant="secondary">3</Button>
        <Button className="page_btn" variant="secondary">...</Button>
        <Button className="page_btn" variant="primary">{'>'}</Button>
      </div>
    </div>
  );
}

