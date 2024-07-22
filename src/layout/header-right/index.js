/* eslint-disable no-unused-vars */
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilBell from '@iconscout/react-unicons/icons/uil-bell';
import UilDollarSign from '@iconscout/react-unicons/icons/uil-dollar-sign';
import UilSetting from '@iconscout/react-unicons/icons/uil-setting';
import UilSignout from '@iconscout/react-unicons/icons/uil-signout';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilUsersAlt from '@iconscout/react-unicons/icons/uil-users-alt';
import { Avatar } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { InfoWrapper, NavAuth, UserDropDown } from './Style';

import { logOut } from '@/redux/authentication/actionCreator';
import ChatAuthImg from '@/static/img/corporate.png';
import EngImg from '@/static/img/flag/en.png';
import VieImg from '@/static/img/flag/vi.png';
import { setItem } from '@/utils/localStorageControl';
import { useTranslation } from 'react-i18next';
import Heading from '@/components/heading/heading';
import { Popover } from '@/components/popup/popup';
import Customizer from './Customizer';

const AuthInfo = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const [state, setState] = useState({
    flag: i18n.language,
  });
  const { flag } = state;

  const signOut = (e) => {
    e.preventDefault();
    dispatch(logOut(() => navigate('/')));
  };

  const userContent = (
    <UserDropDown>
      <div className="user-dropdown">
        <figure className="user-dropdown__info">
          <img src={ChatAuthImg} alt="" />
          <figcaption>
            <Heading as="h5">Cristiano Ronaldo</Heading>
          </figcaption>
        </figure>
        <ul className="user-dropdown__links">
          <li>
            <Link to="#">
              <UilUser /> {t('User_Profile')}
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilSetting /> {t('User_Settings')}
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilDollarSign /> {t('User_Billing')}
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilUsersAlt /> {t('User_Activity')}
            </Link>
          </li>
          <li>
            <Link to="#">
              <UilBell /> {t('User_Help')}
            </Link>
          </li>
        </ul>
        <Link className="user-dropdown__bottomAction" onClick={signOut}>
          <UilSignout /> {t('User_SignOut')}
        </Link>
      </div>
    </UserDropDown>
  );

  const onFlagChangeHandle = (value, e) => {
    e.preventDefault();
    setState({
      ...state,
      flag: value,
    });
    i18n.changeLanguage(value);
    setItem('lang', value);
  };

  const country = (
    <NavAuth>
      <Link onClick={(e) => onFlagChangeHandle('vi', e)} style={{ marginBottom: 5, borderRadius: 5 }}>
        <img width="20" src={VieImg} alt="" />
        <span>{t('Language_Vietnamese')}</span>
      </Link>
      <Link onClick={(e) => onFlagChangeHandle('en', e)} style={{ borderRadius: 5 }}>
        <img src={EngImg} alt="" />
        <span>{t('Language_English')}</span>
      </Link>
    </NavAuth>
  );

  return (
    <InfoWrapper>
      {/* <Search /> */}
      {/* <Message /> */}
      {/* <Notification /> */}
      {/* <Settings /> */}
      <Customizer />
      {/* <div className="invoice-nav-actions__item invoice-nav-actions__language">
        <Popover placement="bottomRight" content={country} trigger="click">
          <Link to="#" className="invoice-nav-action-link">
            <img width="25" src={require(`@/static/img/flag/${flag}.png`)} alt="" />
          </Link>
        </Popover>
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
