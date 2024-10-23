import React, { useState } from 'react';
import Customizer from './components/Customizer';
import { OrgSelect } from './components/OrgSelect';
import { UserMenuDropdown } from './components/user-menu/UserMenuDropdown';
import { InfoWrapper } from './style';

const AuthInfo = React.memo(() => {
  // const { i18n } = useTranslation();

  const [settingOpen, setSettingOpen] = useState(false);

  // const [state, setState] = useState({
  //   flag: i18n.language,
  // });

  // const { flag } = state;

  return (
    <InfoWrapper>
      <OrgSelect />
      <Customizer open={settingOpen} onClose={() => setSettingOpen(false)} />
      {/* <Notification />
      <Settings />
      <Customizer />
      <LanguageDropdown flag={flag} country={country}/> */}
      <UserMenuDropdown setSettingOpen={setSettingOpen} />
    </InfoWrapper>
  );
});

export default AuthInfo;
