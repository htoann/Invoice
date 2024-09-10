import { Popover } from '@/components/popup';
import { UilBook, UilDownloadAlt, UilFile, UilFileAlt, UilPrint, UilTimes } from '@iconscout/react-unicons';
import { NavLink } from 'react-router-dom';
import { Button } from '../buttons';

function ExportButtonPageHeader() {
  const content = (
    <>
      <NavLink to="#">
        <UilPrint />
        <span>Printer</span>
      </NavLink>
      <NavLink to="#">
        <UilBook />
        <span>PDF</span>
      </NavLink>
      <NavLink to="#">
        <UilFileAlt />
        <span>Google Sheets</span>
      </NavLink>
      <NavLink to="#">
        <UilTimes />
        <span>Excel (XLSX)</span>
      </NavLink>
      <NavLink to="#">
        <UilFile />
        <span>CSV</span>
      </NavLink>
    </>
  );
  return (
    <Popover placement="bottomLeft" content={content} trigger="click">
      <Button size="small" type="white">
        <UilDownloadAlt />
        Export
      </Button>
    </Popover>
  );
}

export { ExportButtonPageHeader };
