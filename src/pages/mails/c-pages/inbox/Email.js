import UilAlignLeft from '@iconscout/react-unicons/icons/uil-align-left';
import UilAlignRight from '@iconscout/react-unicons/icons/uil-align-right';
import { Col, Row, Spin } from 'antd';
import React, { lazy, Suspense, useLayoutEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { PageHeader } from '../../../../components/page-headers/page-headers';
import { Main } from '../../../../container/styled';
import { InboxList } from './overview/InboxList';
import { EmailWrapper } from './overview/style';

const MailDetailView = lazy(() => import('./overview/MailDetailView'));

function Email() {
  const { pathname } = useLocation();

  const PageRoutes = [
    {
      path: '/email/',
      breadcrumbName: 'Hộp thư',
    },
    {
      path: '/email/inbox',
      breadcrumbName: 'Hộp thư đến',
    },
  ];

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

  const inboxId = pathname.startsWith('/email/inbox/') ? pathname.substring('/email/inbox/'.length) : null;

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Hộp thư đến" routes={PageRoutes} />

      <Main>
        <EmailWrapper>
          <Row gutter={25}>
            <Col className="trigger-col" xxl={8} xl={9} lg={10} xs={24}>
              {inboxId && responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
                </Button>
              )}

              <div className={`mail-sideabr ${inboxId && responsive <= 991 ? (collapsed ? 'show' : 'hide') : ''}`}>
                <Cards headless>
                  <div className="mail-sidebar-bottom">
                    <InboxList toggleCollapsed={inboxId ? toggleCollapsed : undefined} />
                  </div>
                </Cards>
              </div>
            </Col>

            <Col xxl={16} xl={15} lg={14}>
              <Suspense
                fallback={
                  <div className="spin">
                    <Spin />
                  </div>
                }
              >
                <Routes>
                  <Route path="inbox/:id" element={<MailDetailView />} />
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
