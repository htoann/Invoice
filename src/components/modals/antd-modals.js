import PropTypes, { object } from 'prop-types';
import React from 'react';
import { ModalStyled } from './styled';
import { Button } from '../buttons/buttons';

const Modal = (props) => {
  const { onCancel, className = 'atbd-modal', onOk, open, title, type, color, footer, width = 620, children } = props;

  return (
    <ModalStyled
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      type={color ? type : false}
      width={width}
      className={className}
      footer={
        footer || footer === null
          ? footer
          : [
              <Button type="secondary" key="back" onClick={onCancel}>
                Cancel
              </Button>,
              <Button type={type} key="submit" onClick={onOk}>
                Save Change
              </Button>,
            ]
      }
    >
      {children}
    </ModalStyled>
  );
};

Modal.propTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  footer: PropTypes.arrayOf(object),
  width: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

const alertModal = ModalStyled;
export { Modal, alertModal };
