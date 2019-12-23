import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
export default function JobList(props) {

  {
    props.jobResults.map((jobResult, index) => {
      return (

        <ListGroup className="list_group" key={index} >
          <ListGroup.Item className="list_item job_title">{jobResult.name}</ListGroup.Item>
          <ListGroup.Item className="list_item company_location">{jobResult.hiring_company.name}</ListGroup.Item>
          <ListGroup.Item className="list_item company_location">{jobResult.location}</ListGroup.Item>
          <ListGroup.Item className="list_item description">Description:<p>{jobResult.snippet}</p></ListGroup.Item>
          <ListGroup.Item className="list_item industry">Industry:{jobResult.industry_name}</ListGroup.Item>
        </ListGroup>
      )
    })
  }

}