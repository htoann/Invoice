import PropTypes, { object } from 'prop-types';
import { Button } from '../button';
import { ModalStyled } from './styled';

const Modal = (props) => {
  const {
    onCancel,
    className = 'atbd-modal',
    onOk,
    open,
    title,
    type = 'primary',
    color,
    footer = null,
    width = 620,
    children,
    top,
  } = props;

  return (
    <ModalStyled
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      type={color ? type : false}
      width={width}
      className={className}
      style={top ? { top: `${top}px` } : undefined}
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
export { alertModal, Modal };
