import { Button } from '@/components/button';
import { Cards } from '@/components/card';
import { FilterOrgStructureHeader } from '@/components/FilterOrgStructureHeader';
import { PageHeader } from '@/components/page-header';
import { Main } from '@/container/style';
import { UilAlignLeft, UilAlignRight } from '@tooni/iconscout-unicons-react';
import { Col, Empty, Row } from 'antd';
import { useGetOrgStructure } from 'hooks/useGetOrgStructure';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InboxList } from './components/inbox-list/InboxList';
import MailDetail from './components/mail-detail';
import { EmailWrapper } from './components/style';
import { pageRoutes } from './utils';

function Email() {
  const { t } = useTranslation();

  useGetOrgStructure();

  const [selectedInbox, setSelectedInbox] = useState('');

  const [pagination, setPagination] = useState({
    pageSize: 20,
    current: 1,
    total: 0,
  });
  const [search, setSearchSender] = useState('');

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

  const handleReset = () => {
    setSearchSender('');
    setPagination({
      pageSize: 20,
      current: 1,
    });
    setSelectedInbox(null);
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_Inbox')} routes={pageRoutes} />

      <Main>
        <EmailWrapper>
          <Cards headless>
            <FilterOrgStructureHeader handleReset={handleReset} />
          </Cards>

          <Row gutter={25} style={{ height: '100%' }}>
            <Col className="trigger-col" xxl={8} xl={9} lg={10} xs={24} style={{ height: '100%' }}>
              {selectedInbox && responsive <= 991 && (
                <Button type="link" className="mail-sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAlignLeft /> : <UilAlignRight />}
                </Button>
              )}

              <div
                className={`mail-sidebar ${selectedInbox && responsive <= 991 ? (collapsed ? 'show' : 'hide') : ''}`}
              >
                <Cards headless nomargin>
                  <div
                    className={
                      responsive <= 991 ? 'mail-sidebar-bottom mail-sidebar-bottom-scroll' : 'mail-sidebar-bottom'
                    }
                  >
                    <InboxList
                      setSelectedInbox={setSelectedInbox}
                      selectedInbox={selectedInbox}
                      pagination={pagination}
                      setPagination={setPagination}
                      setSearchSender={setSearchSender}
                      search={search}
                    />
                  </div>
                </Cards>
              </div>
            </Col>

            <Col xxl={16} xl={15} lg={14} xs={24} style={{ height: '100%' }}>
              {selectedInbox ? (
                <MailDetail selectedInbox={selectedInbox} />
              ) : (
                <Cards
                  headless
                  style={{ height: 'var(--mail-inbox)' }}
                  bodyStyle={{ margin: 'auto', height: '100%', display: 'flex' }}
                  nomargin
                >
                  <Empty description={t('Common_SelectAnEmail')} style={{ margin: 'auto' }} />
                </Cards>
              )}
            </Col>
          </Row>
        </EmailWrapper>
      </Main>
    </>
  );
}

export default Email;
