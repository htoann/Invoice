import { Dropdown } from '@/components/dropdown';
import Heading from '@/components/heading';
import { UilEllipsisH } from '@tooni/iconscout-unicons-react';
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
    bodypadding,
    className,
    style,
    nomargin,
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
          bodypadding={bodypadding && bodypadding}
          nomargin={nomargin?.toString()}
          extra={
            <>
              {more && (
                <Dropdown content={more} placement="bottom">
                  <Link onClick={(e) => e.preventDefault()} to="#">
                    {!moreText ? <UilEllipsisH /> : 'More'}
                  </Link>
                </Dropdown>
              )}

              {isButton && isButton}
            </>
          }
          style={{ width: '100%', ...style }}
        >
          {children}
        </CardFrame>
      ) : (
        <CardFrame
          bodypadding={bodypadding && bodypadding}
          bodyStyle={bodyStyle && bodyStyle}
          size={size}
          style={{ width: '100%', ...style }}
          bordered={border}
          className={className}
          nomargin={nomargin?.toString()}
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
  bodypadding: PropTypes.string,
  className: PropTypes.string,
  moreText: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

export { Cards };
