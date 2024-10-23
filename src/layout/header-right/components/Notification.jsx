import Heading from '@/components/heading';
import { Popover } from '@/components/popup';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { UilHdd, UilUpload } from '@tooni/iconscout-unicons-react';
import { Badge } from 'antd';
import { useAppState } from 'context/AppContext';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { UserActionDropDown } from '../style';

const NotificationBox = React.memo(() => {
  const { rtl } = useAppState();

  function renderThumb({ style }) {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  }

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="hello" style={thumbStyle} />;
  };

  function renderView({ style }) {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div style={{ ...style, ...customStyle }} />;
  }

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  const content = (
    <UserActionDropDown className="invoice-top-dropdown">
      <Heading as="h5" className="invoice-top-dropdown__title">
        <span className="title-text">Notifications</span>
        <Badge className="badge-success" count={3} />
      </Heading>
      <Scrollbars
        autoHeight
        autoHide
        renderThumbVertical={renderThumb}
        renderView={renderView}
        renderTrackVertical={renderTrackVertical}
        renderTrackHorizontal={(props) => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
      >
        <ul className="invoice-top-dropdown__nav notification-list">
          <li>
            <Link to="#">
              <div className="invoice-top-dropdown__content notifications">
                <div className="notification-icon bg-primary">
                  <UilHdd />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>
                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="invoice-top-dropdown__content notifications">
                <div className="notification-icon bg-secondary">
                  <UilUpload />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="invoice-top-dropdown__content notifications">
                <div className="notification-icon bg-secondary">
                  <UilUpload />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="invoice-top-dropdown__content notifications">
                <div className="notification-icon bg-secondary">
                  <UilUpload />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="#">
              <div className="invoice-top-dropdown__content notifications">
                <div className="notification-icon bg-secondary">
                  <UilUpload />
                </div>
                <div className="notification-content d-flex">
                  <div className="notification-text">
                    <Heading as="h5">
                      <span>James</span> sent you a message
                    </Heading>
                    <p>5 hours ago</p>
                  </div>

                  <div className="notification-status">
                    <Badge dot />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </Scrollbars>
      <Link className="btn-seeAll" to="#">
        See all incoming activity
      </Link>
    </UserActionDropDown>
  );

  return (
    <div className="invoice-nav-actions__item invoice-nav-actions__notification">
      <Popover placement="bottomLeft" content={content} action="click">
        <Badge dot offset={[-8, -5]}>
          <Link to="#" className="invoice-nav-action-link">
            <ReactSVG src={require('@/static/img/icon/bell.svg').default} />
          </Link>
        </Badge>
      </Popover>
    </div>
  );
});

export default NotificationBox;
