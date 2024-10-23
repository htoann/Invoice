import { ORG_ID, ORG_LIST } from '@/utils/index';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { Select, Tooltip } from 'antd';
import { useAuth } from 'context/AuthContext';

export const OrgSelect = () => {
  const { userInfo } = useAuth();

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
  );
};
