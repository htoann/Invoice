/* eslint-disable no-unused-vars */
import { Popover } from '@/components/popup';
import { ORG_ID, ORG_LIST } from '@/utils/index';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { UilAngleDown } from '@tooni/iconscout-unicons-react';
import { Avatar, Select, Tooltip } from 'antd';
import { useAuth } from 'context/AuthContext';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Customizer from './components/Customizer';
import { UserMenu } from './components/UserMenu';
import { InfoWrapper } from './style';

const AuthInfo = React.memo(() => {
  const { i18n } = useTranslation();
  const { userInfo } = useAuth();

  const [settingOpen, setSettingOpen] = useState(false);

  const [state, setState] = useState({
    flag: i18n.language,
  });

  const { flag } = state;

  const orgs = userInfo?.organizations || getLocalStorage(ORG_LIST) || [];

  const orgCode = orgs.length ? getLocalStorage(ORG_ID) || orgs?.[0]?.id : null;

  const optionsOrg =
    orgs?.length > 0
      ? orgs?.map(({ id, name, tax_code }) => ({
          value: id,
          label: (
            <Tooltip title={name} showArrow={false} placement="left">
              <div style={{ fontSize: '13px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {name}
              </div>
              <div style={{ fontSize: '12px', color: '#888' }}>{tax_code}</div>
            </Tooltip>
          ),
        }))
      : [];

  return (
    <InfoWrapper>
      <Select
        popupClassName="dropdown-select"
        onChange={(orgId) => {
          setLocalStorage(ORG_ID, orgId);
          window.location.reload();
        }}
        value={orgCode}
        style={{ marginRight: 12, marginLeft: 12, minWidth: 200, maxWidth: 300 }}
        key={orgCode}
        options={optionsOrg}
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
        <Popover
          placement="bottomRight"
          content={<UserMenu userInfo={userInfo} setSettingOpen={setSettingOpen} />}
          action="click"
        >
          <Link to="#" className="invoice-nav-action-link">
            <Avatar size={40} style={{ backgroundColor: '#8231D3' }}>
              {(userInfo?.last_name || userInfo?.username)?.charAt(0)?.toUpperCase()}
            </Avatar>
            <span className="invoice-nav-actions__author--name">
              {userInfo?.first_name && userInfo?.last_name
                ? `${userInfo?.first_name} ${userInfo?.last_name}`
                : userInfo?.username}
            </span>
            <UilAngleDown />
          </Link>
        </Popover>
      </div>
    </InfoWrapper>
  );
});

export default AuthInfo;
