import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilBell from '@iconscout/react-unicons/icons/uil-bell';
import UilDollarSign from '@iconscout/react-unicons/icons/uil-dollar-sign';
import UilSetting from '@iconscout/react-unicons/icons/uil-setting';
import UilSignout from '@iconscout/react-unicons/icons/uil-signout';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilUsersAlt from '@iconscout/react-unicons/icons/uil-users-alt';
import { Avatar } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logOut } from '../../redux/authentication/actionCreator';
import Message from './Message';
import Notification from './Notification';
import { InfoWrapper, UserDropDown } from './Style';

import Heading from '../../components/heading/heading';
import { Popover } from '../../components/popup/popup';

const AuthInfo = React.memo(() => {
  const dispatch = useDispatch();

  // const [state, setState] = useState({
  //   flag: 'en',
  // });
  const navigate = useNavigate();
  // const { i18n } = useTranslation();

  const SignOut = (e) => {
    e.preventDefault();

    dispatch(logOut(() => navigate('/')));
  };

  const userContent = (
    <UserDropDown>
      <div className="user-dropdown">
        <figure className="user-dropdown__info">
          <img src={require('../../static/img/avatar/chat-auth.png')} alt="" />
          <figcaption>
            <Heading as="h5">Cristiano Ronaldo</Heading>
            <p>UI Expert</p>
          </figcaption>
        </figure>
        <ul className="user-dropdown__links">
          <li>
            <Link to="#">
              <UilUser /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilSetting /> Settings
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilDollarSign /> Billing
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilUsersAlt /> Activity
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilBell /> Help
            </Link>
          </li>
        </ul>
        <Link className="user-dropdown__bottomAction" onClick={SignOut} to="#">
          <UilSignout /> Sign Out
        </Link>
      </div>
    </UserDropDown>
  );

  // const onFlagChangeHandle = (value, e) => {
  //   e.preventDefault();
  //   setState({
  //     ...state,
  //     flag: value,
  //   });
  //   i18n.changeLanguage(value);
  // };

  // const country = (
  //   <NavAuth>
  //     <Link onClick={(e) => onFlagChangeHandle('en', e)} to="#">
  //       <img src={require('../../static/img/flag/en.png')} alt="" />
  //       <span>English</span>
  //     </Link>
  //     <Link onClick={(e) => onFlagChangeHandle('esp', e)} to="#">
  //       <img src={require('../../static/img/flag/esp.png')} alt="" />
  //       <span>Spanish</span>
  //     </Link>
  //     <Link onClick={(e) => onFlagChangeHandle('ar', e)} to="#">
  //       <img src={require('../../static/img/flag/ar.png')} alt="" />
  //       <span>Arabic</span>
  //     </Link>
  //   </NavAuth>
  // );

  return (
    <InfoWrapper>
      {/* <Search /> */}
      <Message />
      <Notification />
      {/* <Settings /> */}
      {/* <div className="invoice-nav-actions__item invoice-nav-actions__language">
        <Dropdown placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="invoice-nav-action-link">
            <img src={require(`../../../static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Dropdown>
      </div> */}
      <div className="invoice-nav-actions__item invoice-nav-actions__author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="invoice-nav-action-link">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
            <span className="invoice-nav-actions__author--name">Cristiano Ronaldo</span>
            <UilAngleDown />
          </Link>
        </Popover>
      </div>
    </InfoWrapper>
  );
});

export default AuthInfo;
