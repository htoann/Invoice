import { Cards } from '@/components/cards/frame/cards-frame';
import Heading from '@/components/heading/heading';

import { Col, Row } from 'antd';
import { MailDetailsWrapper, MessageDetails } from '../style';
import { AttachmentList } from './AttachmentList';
import { Header } from './Header';

function MailDetail({ selectedInbox: email }) {
  const cleanedBody = email?.body?.replace(/<style[\s\S]*?<\/style>/gi, '');

  return (
    <MailDetailsWrapper>
      <Cards headless noMargin>
        <Row gutter={15} style={{ maxHeight: 'var(--mail-detail)' }}>
          <Col style={{ width: '100%' }}>
            <MessageDetails>
              <div className="d-flex justify-content-between align-items-center">
                <div className="message-subject">
                  <Heading as="h2">
                    {email?.subject}
                    <span className="mail-badge primary">{email?.type || 'Inbox'}</span>
                  </Heading>
                </div>
              </div>

              <Header email={email} />

              <div className="message-body" dangerouslySetInnerHTML={{ __html: cleanedBody }} />

              <AttachmentList />
            </MessageDetails>
          </Col>
        </Row>
      </Cards>
    </MailDetailsWrapper>
  );
}

export default MailDetail;
