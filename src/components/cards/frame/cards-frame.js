import { Dropdown } from '@/components/dropdown/dropdown';
import Heading from '@/components/heading/heading';
import UilellipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CardFrame } from './style';

const Cards = (props) => {
  const {
    title,
    children,
    more,
    moreText,
    size,
    headless,
    caption,
    isButton,
    bodyStyle,
    headStyle,
    border = false,
    bodyPadding,
    className,
  } = props;
  return (
    <>
      {!headless ? (
        <CardFrame
          size={size}
          title={title}
          bodyStyle={bodyStyle && bodyStyle}
          headStyle={headStyle && headStyle}
          bordered={border}
          className={className}
          bodyPadding={bodyPadding && bodyPadding}
          extra={
            <>
              {more && (
                <Dropdown content={more} placement="bottom">
                  <Link onClick={(e) => e.preventDefault()} to="#">
                    {!moreText ? <UilellipsisH /> : 'More'}
                  </Link>
                </Dropdown>
              )}

              {isButton && isButton}
            </>
          }
          style={{ width: '100%' }}
        >
          {children}
        </CardFrame>
      ) : (
        <CardFrame
          bodyPadding={bodyPadding && bodyPadding}
          bodyStyle={bodyStyle && bodyStyle}
          size={size}
          style={{ width: '100%' }}
          bordered={border}
          className={className}
        >
          {title && <Heading as="h4">{title}</Heading>}
          {caption && <p>{caption}</p>}
          {children}
        </CardFrame>
      )}
    </>
  );
};

Cards.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  size: PropTypes.string,
  more: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.node]),
  bodyStyle: PropTypes.object,
  headStyle: PropTypes.object,
  isButton: PropTypes.node,
  headless: PropTypes.bool,
  border: PropTypes.bool,
  caption: PropTypes.string,
  bodyPadding: PropTypes.string,
  className: PropTypes.string,
  moreText: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

export { Cards };
