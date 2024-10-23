import { Popover } from '@/components/popup';
import { Link } from 'react-router-dom';

export const LanguageDropdown = ({ flag, country }) => {
  return (
    <div className="invoice-nav-actions__item invoice-nav-actions__language">
      <Popover placement="bottomRight" content={country} trigger="click">
        <Link to="#" className="invoice-nav-action-link">
          <img width="25" src={require(`@/static/img/flag/${flag}.png`)} alt="" />
        </Link>
      </Popover>
    </div>
  );
};
