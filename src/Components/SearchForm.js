import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, ListGroup } from 'react-bootstrap';


export default function SearchFrom() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobResults, setJobResults] = useState([])

  function submitSearch() {

    const searchLocation = location.split(' ').join("%20")
    axios.get(`https://api.ziprecruiter.com/jobs/v1?search=${jobTitle}%20Job&location=${searchLocation}&radius_miles=25&days_ago=&jobs_per_page=10&page=1&api_key=mthpyw9ea7zyswfuj3zur6bt55fce7qf`)
      .then((res) => {
        setJobResults(res.data.jobs)
        console.log(jobResults[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }
  if (jobResults.length === 0) {
    return (
      <div>
        <Form style={{ width: 300, marginTop: 10 }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Job Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Job Title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" value={location} onChange={(event) => setLocation(event.target.value)} />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={submitSearch}>
          Submit
        </Button>
      </div>
    )
  }
  return (
    <div>
      <div>
        <Form style={{ width: 300, marginTop: 10 }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Job Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Job Title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" value={location} onChange={(event) => setLocation(event.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={submitSearch}>
            Submit
          </Button>
        </Form>
      </div>
      <div>
        {jobResults.map((jobResult, index) => {
          return (
            <ListGroup key={index} style={{ width: 300, marginTop: 10 }}>
              <ListGroup.Item>Job Title:{jobResult.name}</ListGroup.Item>
              <ListGroup.Item>Industry Name:{jobResult.industry_name}</ListGroup.Item>
              <ListGroup.Item>location:{jobResult.location}</ListGroup.Item>
              <ListGroup.Item>Company:{jobResult.hiring_company.name}</ListGroup.Item>
              <ListGroup.Item>Description:{jobResult.snippet}</ListGroup.Item>
            </ListGroup>
          )
        })}
      </div>
    </div>
  );
}

