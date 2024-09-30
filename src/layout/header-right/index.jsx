/* eslint-disable no-unused-vars */
import Heading from '@/components/heading';
import { Popover } from '@/components/popup';
import EngImg from '@/static/img/flag/en.png';
import VieImg from '@/static/img/flag/vi.png';
import { ORG_ID, ORG_LIST } from '@/utils/index';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { UilAngleDown, UilBell, UilSetting, UilSignout, UilUser, UilUsersAlt } from '@tooni/iconscout-unicons-react';
import { Avatar, Select, Tooltip } from 'antd';
import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Customizer from './Customizer';
import { InfoWrapper, NavAuth, UserDropDown } from './Style';

const AuthInfo = React.memo(() => {
  const { i18n, t } = useTranslation();
  const { logOut, userInfo } = useAuth();

  const [settingOpen, setSettingOpen] = useState(false);

  const [state, setState] = useState({
    flag: i18n.language,
  });

  const { flag } = state;

  const signOut = (e) => {
    e.preventDefault();
    logOut();
  };

  const userContent = (
    <UserDropDown>
      <div className="user-dropdown">
        <figure className="user-dropdown__info">
          <Avatar size={48} style={{ backgroundColor: '#8231D3' }}>
            {userInfo?.username?.charAt(0)?.toUpperCase()}
          </Avatar>
          <figcaption style={{ margin: 'auto' }}>
            <Heading as="h5">
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '80px',
                }}
              >
                {userInfo?.username}
              </div>
            </Heading>
          </figcaption>
        </figure>
        <ul className="user-dropdown__links">
          <li>
            <Link to="#">
              <UilUser /> {t('User_Profile')}
            </Link>
          </li>
          <li>
            <Link to="#" onClick={() => setSettingOpen(true)}>
              <UilSetting /> {t('User_Settings')}
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
    setLocalStorage('lang', value);
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

  const orgs = userInfo?.organizations || getLocalStorage(ORG_LIST) || [];
  const orgCode = orgs.length ? (getLocalStorage(ORG_ID) || orgs?.[0]?.id) : null;

  return (
    <InfoWrapper>
      <Select
        popupClassName="dropdown-select"
        onChange={(orgId) => {
          setLocalStorage(ORG_ID, orgId);
          window.location.reload();
        }}
        value={orgCode}
        style={{ marginRight: 12, minWidth: 100, maxWidth: 250 }}
        key={orgCode}
        options={orgs.map((org) => ({
          value: org.id,
          label: (
            <div>
              <Tooltip title={org.name} showArrow={false} placement="left">
                <div
                  style={{
                    fontSize: '14px',
                    textOverflow: 'ellipsis',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {org.name}
                </div>
                <div style={{ fontSize: '12px', color: '#888' }}>{org.tax_code}</div>
              </Tooltip>
            </div>
          ),
        }))}
      />
      <Customizer open={settingOpen} onClose={() => setSettingOpen(false)} />
      {/* <Notification /> */}
      {/* <Settings /> */}
      {/* <Customizer /> */}
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
            <Avatar size={40} style={{ backgroundColor: '#8231D3' }}>
              {userInfo?.username?.charAt(0)?.toUpperCase()}
            </Avatar>
            <span className="invoice-nav-actions__author--name">{userInfo?.username}</span>
            <UilAngleDown />
          </Link>
        </Popover>
      </div>
    </InfoWrapper>
  );
});

export default AuthInfo;
