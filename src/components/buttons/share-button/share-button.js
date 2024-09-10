import { Popover } from '@/components/popup';
import {
  UilFacebook,
  UilInstagram,
  UilLinkedin,
  UilRss,
  UilShareAlt,
  UilTwitter,
} from '@tooni/iconscout-unicons-react';
import { NavLink } from 'react-router-dom';
import { Button } from '..';

function ShareButtonPageHeader() {
  const content = (
    <>
      <NavLink to="#">
        <UilFacebook />
        <span>Facebook</span>
      </NavLink>
      <NavLink to="#">
        <UilTwitter />
        <span>Twitter</span>
      </NavLink>
      <NavLink to="#">
        <UilRss />
        <span>Feed</span>
      </NavLink>
      <NavLink to="#">
        <UilLinkedin />
        <span>Linkedin</span>
      </NavLink>
      <NavLink to="#">
        <UilInstagram />
        <span>Instagram</span>
      </NavLink>
    </>
  );
  return (
    <Popover placement="bottomLeft" content={content} trigger="click">
      <Button size="small" type="white" key="3">
        <UilShareAlt />
        Share
      </Button>
    </Popover>
  );
}

export { ShareButtonPageHeader };
