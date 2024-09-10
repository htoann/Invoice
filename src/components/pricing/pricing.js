import { UilCheck } from '@iconscout/react-unicons';
import PropTypes from 'prop-types';
import { ListStyle } from './style';

function List(props) {
  const { text } = props;

  return (
    <ListStyle className="list-single">
      <span className="icon">
        <UilCheck />
      </span>
      <span>{text}</span>
    </ListStyle>
  );
}
List.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
};
export { List };
