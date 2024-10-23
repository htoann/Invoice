/* eslint-disable no-unused-vars */
import { Card } from 'antd';
import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import CountUp from '../../count-up';
import { OverviewCardWrap } from './style';

const OverviewCard = ({
  data = {},
  className = 'invoice-overview-card-box',
  bottomStatus = true,
  contentFirst = false,
  halfCircleIcon = false,
}) => {
  const [didViewCountUp, setDidViewCountUp] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setDidViewCountUp(true);
  }, [pathname]);

  const { type, icon, label, total, status, statusRate, dataPeriod, suffix, prefix, decimals, separator } = data;
  const totalNumber = Number(total);
  return (
    <OverviewCardWrap className={className}>
      <Card bordered={false} className={halfCircleIcon ? 'invoice-overview-halfCircle-card' : null}>
        <div className={`invoice-overview-card invoice-overview-card-${type}`}>
          <div
            className={
              contentFirst
                ? 'invoice-overview-card__top d-flex justify-content-between invoice-overview-card-theme-2'
                : 'invoice-overview-card__top d-flex justify-content-between'
            }
          >
            <div className={`invoice-overview-card__top--icon invoice-${type}`}>
              <ReactSVG src={require(`@/static/img/icon/${icon}`)} />
            </div>
            <div
              className={
                contentFirst ? 'invoice-overview-card__top--content' : 'invoice-overview-card__top--content text-right'
              }
            >
              {halfCircleIcon ? (
                <>
                  <span className="invoice-overview-label">{label}</span>
                  <h4 className="invoice-overview-total">
                    <CountUp
                      start={0}
                      end={didViewCountUp ? totalNumber : 0}
                      suffix={suffix}
                      prefix={prefix}
                      delay={0.5}
                      decimals={decimals}
                      separator={separator}
                      duration={2}
                    />
                  </h4>
                </>
              ) : (
                <>
                  <h4 className="invoice-overview-total">
                    <CountUp
                      start={0}
                      end={didViewCountUp ? totalNumber : 0}
                      suffix={suffix}
                      prefix={prefix}
                      delay={0.5}
                      decimals={decimals}
                      separator={separator}
                      duration={2}
                    />
                  </h4>
                  <span className="invoice-overview-label">{label}</span>
                </>
              )}
            </div>
          </div>
          {bottomStatus ? (
            <div className="invoice-overview-card__bottom">
              <span className={`invoice-overview-status invoice-status-${status}`}>
                <span className="invoice-status-label">{dataPeriod}</span>
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </Card>
    </OverviewCardWrap>
  );
};

OverviewCard.propTypes = {
  data: propTypes.object,
  className: propTypes.string,
  bottomStatus: propTypes.bool,
  contentFirst: propTypes.bool,
  halfCircleIcon: propTypes.bool,
};

export default OverviewCard;
