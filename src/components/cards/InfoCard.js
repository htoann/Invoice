import * as Unicons from '@iconscout/react-unicons';
import propTypes from 'prop-types';
import React from 'react';
import { InfoCardStyle } from './Style';

const InfoCard = ({ icon = 'briefcase', text = 'Total Products', counter = '21k', type = 'primary' }) => {
  const IconTag = Unicons[icon];
  return (
    <InfoCardStyle type={type}>
      <span className="invoice-infocard-icon">
        <IconTag />
      </span>
      <p className="invoice-infocard-text">{text}</p>
      <h2 className="invoice-infocard-label">{counter}</h2>
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
