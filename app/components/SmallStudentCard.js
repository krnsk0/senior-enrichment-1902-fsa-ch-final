import React from 'react';
import { Link } from 'react-router-dom';

const SmallStudentCard = props => {
  const student = props.student;
  return (
    <div key={student.id} className="small-card student">
      <Link to={`/students/${student.id}`}>
        <div className="small-card-label student">
          {student.firstName}
          <br />
          {student.lastName}
        </div>
      </Link>
      <div className="small-card-links-container student">
        <span>
          [
          <Link to={`/studnets/${student.id}/edit`} className="edit">
            edit
          </Link>
          ]
        </span>
        <span>
          [
          <Link
            to=""
            className="delete"
            onClick={evt => props.handleDelete(evt, student.id)}
          >
            delete
          </Link>
          ]
        </span>
      </div>
      <Link to={`/students/${student.id}`}>
        <img className="small-card-image student" src={student.imageUrl} />
      </Link>
    </div>
  );
};

export default SmallStudentCard;
