import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { getRandomPsalm } from '../../actions';
import './Psalm.scss';

const Psalm = props => {
  const ref = useRef();
  const getPsalm = async () => {
    ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    props.getRandomPsalm();
  };

  useEffect(() => {
    getPsalm();
  }, []);

  return (
    <div
      ref={ref}
      className='h-screen p-10 mb-5 overflow-scroll container is-size-4'>
      <div
        dangerouslySetInnerHTML={{
          __html: props.psalm,
        }}></div>
      <div className='flex justify-center items-center'>
        <button className='button is-primary' onClick={getPsalm}>
          Get a new Psalm
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { psalm: state.randomPsalm };
};

export default connect(mapStateToProps, { getRandomPsalm })(Psalm);
