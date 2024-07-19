import UilArchive from '@iconscout/react-unicons/icons/uil-archive';
import UilBookOpen from '@iconscout/react-unicons/icons/uil-book-open';
import UilExclamationOctagon from '@iconscout/react-unicons/icons/uil-exclamation-octagon';
import UilFolder from '@iconscout/react-unicons/icons/uil-folder';
import UilRedo from '@iconscout/react-unicons/icons/uil-redo';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash';
import { Tooltip } from 'antd';
import propTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageAction } from './style';

const Topbar = React.memo(({ refreshState }) => {
  return (
    <MessageAction>
      <Tooltip placement="bottom" title="Refresh">
        <NavLink onClick={refreshState} to="/refresh">
          <UilRedo />
        </NavLink>
      </Tooltip>
      <Tooltip placement="bottom" title="Archive">
        <NavLink to="/">
          <UilArchive />
        </NavLink>
      </Tooltip>
      <Tooltip placement="bottom" title="Info">
        <NavLink to="/">
          <UilExclamationOctagon />
        </NavLink>
      </Tooltip>
      <Tooltip placement="bottom" title="Delete">
        <NavLink to="/">
          <UilTrash />
        </NavLink>
      </Tooltip>
      <Tooltip placement="bottom" title="Read">
        <NavLink to="/">
          <UilBookOpen />
        </NavLink>
      </Tooltip>
      <Tooltip placement="bottom" title="Folder">
        <NavLink to="/">
          <UilFolder />
        </NavLink>
      </Tooltip>
    </MessageAction>
  );
});

Topbar.propTypes = {
  refreshState: propTypes.func.isRequired,
};

export default Topbar;
