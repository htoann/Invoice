/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
import UilDown from '@iconscout/react-unicons/icons/uil-arrow-down';
import UilUp from '@iconscout/react-unicons/icons/uil-arrow-up';
import { Card } from 'antd';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { OverviewCardMeshWrap } from './Style';

function OverviewCardMesh({ data, circleIcon }) {
  const [didViewCountUp, setDidViewCountUp] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setDidViewCountUp(true);
  }, [pathname]);

  const { type, icon, label, total, status, statusRate, suffix, prefix, decimal } = data;
  const totalNumber = Number(total);
  return (
    <OverviewCardMeshWrap
      className={circleIcon ? 'invoice-overview-card-single invoice-icon-circle' : 'invoice-overview-card-single'}
    >
      <Card bordered={false}>
        <div className={`invoice-overview-card invoice-overview-card-${type}`}>
          <div className="invoice-overview-card__left d-flex justify-content-between">
            <div className={`invoice-overview-card__left--icon invoice-${type}`}>
              <img src={require(`@/static/img/icon/${icon}`)} />
            </div>
          </div>
          <div className="invoice-overview-card__right">
            <div className="invoice-overview-card__right--content">
              <span className="invoice-overview-label">{label}</span>
            </div>
            <span className={`invoice-overview-status invoice-status-${status}`}>
              <span className="invoice-status-rate">
                {status === 'growth' ? <UilUp /> : <UilDown />} {statusRate}%
              </span>
            </span>
          </div>
        </div>
      </Card>
    </OverviewCardMeshWrap>
  );
}
OverviewCardMesh.propTypes = {
  data: {},
  circleIcon: false,
};
OverviewCardMesh.propTypes = {
  data: propTypes.object,
  circleIcon: propTypes.bool,
};

export default OverviewCardMesh;
