import React from 'react';
import { Link } from 'react-router-dom';
const BigStudentCard = props => {
  return (
    <div className="big-card student">
      <div className="big-card-container student">
        <div className="big-card-image-container student">
          <img
            src={props.student.imageUrl}
            className="big-card-image student"
          />
        </div>
        <div className="big-card-text-container student">
          <div className="big-card-label student">{props.studentName}</div>
          <div className="big-card-description campus">
            Email: {props.student.email}
          </div>
          <div className="big-card-description campus">
            GPA: {props.student.gpa}
          </div>
          <div className="big-card-links-container student">
            {props.isEditFormOpen() ? (
              <span>
                [
                <Link to={`/students/${props.student.id}/`} className="edit">
                  close edit form
                </Link>
                ]
              </span>
            ) : (
              <span>
                [
                <Link
                  to={`/students/${props.student.id}/edit`}
                  className="edit"
                >
                  edit
                </Link>
                ]
              </span>
            )}
            <span>
              [
              <Link to="" className="delete" onClick={props.handleDelete}>
                delete
              </Link>
              ]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigStudentCard;
