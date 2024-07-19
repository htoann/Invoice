import UilAlignLeft from '@iconscout/react-unicons/icons/uil-align-left';
import UilAlignRight from '@iconscout/react-unicons/icons/uil-align-right';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { Col, Row, Spin } from 'antd';
import { lazy, Suspense, useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import EmailNavbar from './overview/Navbar';
import { EmailWrapper, MailSideBar } from './overview/style';

const Inbox = lazy(() => import('./overview/Inbox'));
const Sent = lazy(() => import('./overview/Sent'));
const Draft = lazy(() => import('./overview/Draft'));
const Starred = lazy(() => import('./overview/Starred'));
const Trash = lazy(() => import('./overview/Trash'));
const Spam = lazy(() => import('./overview/Spam'));
const MailDetailView = lazy(() => import('./overview/MailDetailView'));

function Email() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Email',
    },
    {
      path: '',
      breadcrumbName: 'Email',
    },
  ];

  const [isMailEditorOpen, setMailEditorStatus] = useState(false);
  const [state, setState] = useState({
    responsive: 0,
    collapsed: false,
  });

  const { responsive, collapsed } = state;

  useLayoutEffect(() => {
    function updateSize() {
      const width = window.innerWidth;
      setState({ responsive: width });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const toggleCollapsed = () => {
    setState({
      ...state,
      collapsed: !collapsed,
    });
  };

  const toggleMailComposer = () => {
    setMailEditorStatus(!isMailEditorOpen);
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Dashboard" routes={PageRoutes} />

      <Main>
        <EmailWrapper>
          <Row gutter={25}>
            <Col className="trigger-col" xxl={5} xl={7} lg={8} xs={24}>
              {responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
                </Button>
              )}

              {responsive > 991 ? (
                <div className="mail-sidebar">
                  <Cards headless>
                    <div className="mail-sidebar-top">
                      <Button onClick={toggleMailComposer} shape="round" type="primary" size="default" block>
                        <UilPlus /> Compose
                      </Button>
                    </div>

                    <div className="mail-sidebar-bottom">
                      <EmailNavbar />
                    </div>
                  </Cards>
                </div>
              ) : (
                <MailSideBar className={collapsed ? 'mail-sidebar show' : 'mail-sidebar hide'}>
                  <Cards headless>
                    <Button
                      type="link"
                      className="mail-sidebar-trigger trigger-close"
                      style={{ marginTop: 0 }}
                      onClick={toggleCollapsed}
                    >
                      <UilTimes />
                    </Button>
                    <div className="mail-sidebar-top">
                      <Button onClick={toggleMailComposer} shape="round" type="primary" size="default" block>
                        + Compose
                      </Button>
                    </div>

                    <div className="mail-sidebar-bottom">
                      <EmailNavbar toggleCollapsed={toggleCollapsed} />
                    </div>
                  </Cards>
                </MailSideBar>
              )}
            </Col>

            <Col xxl={19} xl={17} lg={16}>
              <Suspense
                fallback={
                  <div className="spin">
                    <Spin />
                  </div>
                }
              >
                <Routes>
                  <Route path="inbox" element={<Inbox />} />
                  <Route path="sent" element={<Sent />} />
                  <Route path="drafts" element={<Draft />} />
                  <Route path="starred" element={<Starred />} />
                  <Route path="spam" element={<Spam />} />
                  <Route path="trash" element={<Trash />} />
                  <Route path="single/:id/*" element={<MailDetailView />} />
                </Routes>
              </Suspense>
            </Col>
          </Row>
        </EmailWrapper>
      </Main>
    </>
  );
}

export default Email;
