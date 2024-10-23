import Heading from '@/components/heading';
import { UilBell, UilSetting, UilSignout, UilUser, UilUsersAlt } from '@tooni/iconscout-unicons-react';
import { Avatar } from 'antd';
import { useAuth } from 'context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UserDropDown } from '../../style';

export const UserMenu = ({ userInfo, setSettingOpen }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const signOut = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <UserDropDown>
      <div className="user-dropdown">
        <figure className="user-dropdown__info">
          <Avatar size={48} style={{ backgroundColor: '#8231D3' }}>
            {(userInfo?.last_name || userInfo?.username)?.charAt(0)?.toUpperCase()}
          </Avatar>
          <figcaption style={{ margin: 'auto 0' }}>
            <Heading as="h5">
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '80px',
                }}
              >
                {userInfo?.first_name && userInfo?.last_name
                  ? `${userInfo?.first_name} ${userInfo?.last_name}`
                  : userInfo?.username}
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
};
