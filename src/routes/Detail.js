import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionCreators } from '../store';

const Detail = ({ deleteToDo }) => {
  const { id } = useParams();
  return (
    <section>
      <div>Detail</div>
      <div>Id:{id}</div>{' '}
      <button
        type="button"
        onClick={() => {
          deleteToDo(parseInt(id));
        }}
      >
        delete
      </button>
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteToDo: (id) => {
      dispatch(actionCreators.deleteToDo(id));
    },
  };
};

export default connect(() => ({}), mapDispatchToProps)(Detail);
