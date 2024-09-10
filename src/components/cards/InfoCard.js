import * as Unicons from '@tooni/iconscout-unicons-react';
import propTypes from 'prop-types';
import { InfoCardStyle } from './Style';

const InfoCard = ({ icon = 'briefcase', text = 'Total Products', counter = '21k', type = 'primary' }) => {
  const IconTag = Unicons[icon];
  return (
    <InfoCardStyle type={type}>
      <span className="invoice-infoCard-icon">
        <IconTag />
      </span>
      <p className="invoice-infoCard-text">{text}</p>
      <h2 className="invoice-infoCard-label">{counter}</h2>
    </InfoCardStyle>
  );
};

InfoCard.propTypes = {
  counter: propTypes.string,
  text: propTypes.string,
  icon: propTypes.string,
  type: propTypes.oneOf(['primary', 'secondary']),
};

export default InfoCard;
