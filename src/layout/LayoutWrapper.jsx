import leftBarIcon from '@/static/img/icon/left-bar.svg';
import logoDark from '@/static/img/logo_dark.png';
import { theme } from '@/utils/theme/themeVariables';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { UilEllipsisV } from '@tooni/iconscout-unicons-react';
import { Button, Col, Layout, Row } from 'antd';
import { useAppState } from 'context/AppContext';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { REACT_MODE } from '../utils';
import AuthInfo from './header-right/index';
import { LeftMenu } from './menu/LeftMenu';
import { TopMenu } from './menu/TopMenu';
import { LayoutContainer, SmallScreenAuthInfo, TopMenuSearch } from './style';

const { Header, Sider, Content } = Layout;

const LayoutWrapper = (WrappedComponent) => {
  const LayoutComponent = (props) => {
    const { rtl, topMenu, layoutMode } = useAppState();
    const [collapsed, setCollapsed] = useState(false);
    const [hide, setHide] = useState(true);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const updateDimensions = useCallback(() => {
      setCollapsed(windowWidth <= 1200);
    }, []);

    useEffect(() => {
      window.addEventListener('resize', updateDimensions);
      updateDimensions();

      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }, [updateDimensions]);

    const toggleCollapsed = useCallback(() => {
      setCollapsed((prevCollapsed) => !prevCollapsed);
    }, []);

    const toggleCollapsedMobile = useCallback(() => {
      if (windowWidth <= 990) {
        setCollapsed((prevCollapsed) => !prevCollapsed);
      }
    }, []);

    const onShowHide = useCallback(() => {
      setHide((prevHide) => !prevHide);
    }, []);

    const left = !rtl ? 'left' : 'right';

    const SideBarStyle = {
      margin: '63px 0 0 0',
      padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
      overflowY: 'auto',
      height: '100vh',
      position: 'fixed',
      [left]: 0,
      zIndex: 988,
    };

    const renderView = ({ style }) => {
      const customStyle = {
        marginRight: 'auto',
        [rtl ? 'marginLeft' : 'marginRight']: '-19px',
      };
      return <div style={{ ...style, ...customStyle }} />;
    };

    const renderThumbVertical = ({ style }) => {
      const thumbStyle = {
        borderRadius: 6,
        backgroundColor: layoutMode ? '#ffffff16' : '#F1F2F6',
        [left]: '2px',
      };
      return <div style={{ ...style, ...thumbStyle }} />;
    };

    const renderThumbHorizontal = ({ style }) => {
      const thumbStyle = {
        borderRadius: 6,
        backgroundColor: layoutMode ? '#ffffff16' : '#F1F2F6',
      };
      return <div style={{ ...style, ...thumbStyle }} />;
    };

    return (
      <LayoutContainer>
        <Layout className="layout">
          <Header
            style={{
              position: 'fixed',
              width: '100%',
              top: 0,
              [!rtl ? 'left' : 'right']: 0,
            }}
          >
            <div className="invoice-header-content d-flex">
              <div className="invoice-header-content__left">
                <div className="navbar-brand align-center-v">
                  <Link className={topMenu && windowWidth > 1328 ? 'invoice-logo top-menu' : 'invoice-logo'} to="/">
                    {REACT_MODE !== 'ave' && <img src={logoDark} alt="logo" />}
                  </Link>
                  {!topMenu || windowWidth <= 1328 ? (
                    <Button type="link" onClick={toggleCollapsed}>
                      <img src={leftBarIcon} alt="menu" />
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="invoice-header-content__right d-flex">
                <div className="invoice-navbar-menu d-flex align-center-v">
                  {topMenu && windowWidth > 1328 && <TopMenu />}
                </div>
                <div className="invoice-nav-actions">
                  {topMenu && windowWidth > 1328 ? (
                    <TopMenuSearch>
                      <div className="top-right-wrap d-flex">
                        <AuthInfo />
                      </div>
                    </TopMenuSearch>
                  ) : (
                    <AuthInfo />
                  )}
                </div>
              </div>
              <div className="invoice-header-content__mobile">
                <div className="invoice-mobile-action">
                  <Link className="btn-auth" onClick={onShowHide} to="#">
                    <UilEllipsisV />
                  </Link>
                </div>
              </div>
            </div>
          </Header>
          <div className="invoice-header-more">
            <Row>
              <Col>
                <div className="invoice-header-more-inner">
                  <SmallScreenAuthInfo hide={hide}>
                    <AuthInfo rtl={rtl} />
                  </SmallScreenAuthInfo>
                </div>
              </Col>
            </Row>
          </div>
          <Layout>
            {!topMenu ||
              (windowWidth <= 1328 && (
                <ThemeProvider theme={theme}>
                  <Sider
                    width={280}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={layoutMode === 'lightMode' ? 'light' : 'dark'}
                  >
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumbVertical}
                      renderView={renderView}
                      renderTrackVertical={(props) => <div {...props} className="invoice-track-vertical" />}
                    >
                      <LeftMenu topMenu={topMenu} toggleCollapsed={toggleCollapsedMobile} />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ))}
            <Layout className="antd-main-layout">
              <Content>
                <WrappedComponent {...props} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
        {windowWidth <= 1328 && (
          <span className={collapsed ? 'invoice-shade' : 'invoice-shade show'} onClick={toggleCollapsed} />
        )}
      </LayoutContainer>
    );
  };

  return LayoutComponent;
};

export default LayoutWrapper;
