import React from 'react';
import { Link } from 'react-router-dom';

const SmallStudentCard = props => {
  const student = props.student;
  return (
    <div key={student.id} className="card">
      <Link to={`/students/${student.id}`}>
        <div className="card-label">
          {student.firstName} {student.lastName}
        </div>
        <img className="card-image" src={student.imageUrl} />
      </Link>
    </div>
  );
};

export default SmallStudentCard;
