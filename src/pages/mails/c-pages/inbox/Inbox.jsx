import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '@/container/styled';
import UilAlignLeft from '@iconscout/react-unicons/icons/uil-align-left';
import UilAlignRight from '@iconscout/react-unicons/icons/uil-align-right';
import { Col, Row } from 'antd';
import { useEffect, useLayoutEffect, useState } from 'react';
import { InboxList } from './components/InboxList';
import MailDetail from './components/MailDetail';
import { EmailWrapper } from './components/style';

function Email() {
  const pageRoutes = [
    {
      path: '/email',
      breadcrumbName: 'Hộp thư',
    },
    {
      path: '/email/inbox',
      breadcrumbName: 'Hộp thư đến',
    },
  ];

  const [selectedInbox, setSelectedInbox] = useState('');

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

  useEffect(() => {
    toggleCollapsed();
  }, [selectedInbox]);

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Hộp thư đến" routes={pageRoutes} />

      <Main>
        <EmailWrapper>
          <Row gutter={25}>
            <Col className="trigger-col" xxl={8} xl={9} lg={10} xs={24}>
              {responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
                </Button>
              )}

              <div
                className={`mail-sideabr ${selectedInbox && responsive <= 991 ? (collapsed ? 'show' : 'hide') : ''}`}
              >
                <Cards headless>
                  <div className="mail-sidebar-bottom">
                    <InboxList setSelectedInbox={setSelectedInbox} selectedInbox={selectedInbox} />
                  </div>
                </Cards>
              </div>
            </Col>

            {selectedInbox && (
              <Col xxl={16} xl={15} lg={14} xs={24}>
                <MailDetail selectedInbox={selectedInbox} />
              </Col>
            )}
          </Row>
        </EmailWrapper>
      </Main>
    </>
  );
}

export default Email;
