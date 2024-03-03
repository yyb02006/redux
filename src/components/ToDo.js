import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

const ToDo = ({ text, deleteToDo, id }) => {
  const onDeleteClick = () => {
    deleteToDo();
  };
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>{' '}
      <button type="button" onClick={onDeleteClick}>
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteToDo: () => {
      dispatch(actionCreators.deleteToDo(ownProps.id));
    },
  };
};

export default connect(() => ({}), mapDispatchToProps)(ToDo);
