import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Content, DropdownStyle } from './style';

const Dropdown = ({
  content = (
    <>
      <Link to="#">
        <span>Export to CSV</span>
      </Link>
      <Link to="#">
        <span>Export to XML</span>
      </Link>
      <Link to="#">
        <span>Export to Drive</span>
      </Link>
    </>
  ),
  placement = 'bottomRight',
  title,
  action = ['hover'],
  children,
  style = {},
  className = 'invoice-dropdown',
}) => {
  return (
    <DropdownStyle
      overlayClassName={className}
      style={style}
      placement={placement}
      title={title}
      menu={<Content>{content}</Content>}
      trigger={action}
    >
      {children}
    </DropdownStyle>
  );
};

Dropdown.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.array,
  content: PropTypes.node,
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

export { Dropdown };
