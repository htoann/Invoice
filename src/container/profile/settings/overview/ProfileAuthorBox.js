import { Cards } from '@/components/cards/frame';
import Heading from '@/components/heading';
import { UilBell, UilCamera, UilSetting, UilUser, UilUsersAlt } from '@tooni/iconscout-unicons-react';
import { Upload } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { ProfileAuthorBox } from './style';

function AuthorBox() {
  const path = '/pages/settings';

  return (
    <ProfileAuthorBox>
      <Cards headless>
        <div className="author-info">
          <figure>
            {/* <img src={require('@/static/img/users/1.png')} alt="" /> */}

            <Upload>
              <Link to="#">
                <UilCamera />
              </Link>
            </Upload>
          </figure>
          <figcaption>
            <div className="info">
              <Heading as="h4">Duran Clayton</Heading>
              <p>UI/UX Designer</p>
            </div>
          </figcaption>
        </div>
        <nav className="settings-menmulist">
          <ul>
            <li>
              <NavLink to={`${path}/profile`}>
                <UilUser />
                Edit Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/account`}>
                <UilSetting />
                Account Settings
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/password`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-key"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Change Password
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/social`}>
                <UilUsersAlt />
                Social Profile
              </NavLink>
            </li>
            <li>
              <NavLink to={`${path}/notification`}>
                <UilBell />
                Notification
              </NavLink>
            </li>
          </ul>
        </nav>
      </Cards>
    </ProfileAuthorBox>
  );
}

export default AuthorBox;
