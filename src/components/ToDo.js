import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const ToDo = ({ text, deleteToDo }) => {
  const onDeleteClick = () => {
    deleteToDo();
  };
  return (
    <li>
      {text}{' '}
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
