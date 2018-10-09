import React from 'react';

import Aux from 'hoc/_Aux';
import Backdrop from 'components/UI/Backdrop/Backdrop';

import classes from './Modal.css';

const Modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          // vh = view port high
          // translateY(-100vh) = slide it outside of screen
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;