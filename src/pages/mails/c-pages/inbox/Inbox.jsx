import { Button } from '@/components/buttons/buttons';
import { Cards } from '@/components/cards/frame/cards-frame';
import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '@/container/styled';
import { routes } from '@/routes/const';
import UilAlignLeft from '@iconscout/react-unicons/icons/uil-align-left';
import UilAlignRight from '@iconscout/react-unicons/icons/uil-align-right';
import { Col, Row } from 'antd';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InboxList } from './components/InboxList';
import MailDetail from './components/MailDetail';
import { EmailWrapper } from './components/style';

function Email() {
  const { t } = useTranslation();

  const pageRoutes = [
    {
      path: routes.emailAccount,
      breadcrumbName: t('Common_Mail'),
    },
    {
      path: routes.emailInbox,
      breadcrumbName: t('Common_Inbox'),
    },
  ];

  const [selectedInbox, setSelectedInbox] = useState('');

  const [state, setState] = useState({
    responsive: window.innerWidth,
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
    responsive <= 991 && toggleCollapsed();
  }, [selectedInbox]);

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_Inbox')} routes={pageRoutes} />

      <Main>
        <EmailWrapper>
          <Row gutter={25}>
            <Col className="trigger-col" xxl={8} xl={9} lg={10} xs={24}>
              {selectedInbox && responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
                </Button>
              )}

              <div
                className={`mail-sidebar ${selectedInbox && responsive <= 991 ? (collapsed ? 'show' : 'hide') : ''}`}
              >
                <Cards headless>
                  <div
                    className={
                      responsive <= 991 ? 'mail-sidebar-bottom mail-sidebar-bottom-scroll' : 'mail-sidebar-bottom'
                    }
                  >
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
