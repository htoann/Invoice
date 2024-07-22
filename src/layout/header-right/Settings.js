import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { SettingDropdown } from './Style';
import Heading from '@/components/heading/heading';
import { Popover } from '@/components/popup/popup';

const Settings = React.memo(() => {
  const content = (
    <SettingDropdown>
      <div className="setting-dropdown">
        <Row gutter="10">
          <Col sm={12} xs={24}>
            <figure className="setting-dropdown__single d-flex">
              <img src={require('@/static/img/icon/014-document.png')} alt="" />
              <figcaption>
                <Heading as="h5">All Features</Heading>
                <p>Introducing Increment subscriptions </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="setting-dropdown__single d-flex">
              <img src={require('@/static/img/icon/015-color-palette.png')} alt="" />
              <figcaption>
                <Heading as="h5">Themes</Heading>
                <p>Third party themes that are compatible </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="setting-dropdown__single d-flex">
              <img src={require('@/static/img/icon/010-home.png')} alt="" />
              <figcaption>
                <Heading as="h5">Payments</Heading>
                <p>We handle billions of dollars </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="setting-dropdown__single d-flex">
              <img src={require('@/static/img/icon/017-video-camera.png')} alt="" />
              <figcaption>
                <Heading as="h5">Design Mockups</Heading>
                <p>Share planning visuals with clients </p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="setting-dropdown__single d-flex">
              <img src={require('@/static/img/icon/013-document-1.png')} alt="" />
              <figcaption>
                <Heading as="h5">Content Planner</Heading>
                <p>Centralize content gathering and editing</p>
              </figcaption>
            </figure>
          </Col>
          <Col sm={12} xs={24}>
            <figure className="setting-dropdown__single d-flex">
              <img src={require('@/static/img/icon/007-microphone-1.png')} alt="" />
              <figcaption>
                <Heading as="h5">Diagram Maker</Heading>
                <p>Plan user flows & test scenarios</p>
              </figcaption>
            </figure>
          </Col>
        </Row>
      </div>
    </SettingDropdown>
  );

  return (
    <div className="invoice-nav-actions__settings">
      <Popover placement="bottomRight" content={content} action="click">
        <Link to="#" className="invoice-nav-action-link">
          <ReactSVG src={require('@/static/img/icon/setting.svg').default} />
        </Link>
      </Popover>
    </div>
  );
});

export default Settings;
