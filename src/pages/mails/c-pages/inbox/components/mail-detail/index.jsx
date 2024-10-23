import { Cards } from '@/components/card';
import Heading from '@/components/heading';
import { MailDetailsWrapper, MessageDetails } from '../style';
import { AttachmentList } from './AttachmentList';
import { Header } from './Header';

function MailDetail({ selectedInbox: email }) {
  const cleanedBody = email?.body?.replace(/<style[\s\S]*?<\/style>/gi, '');

  return (
    <MailDetailsWrapper>
      <Cards headless nomargin>
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
          <AttachmentList email={email} />
        </MessageDetails>
      </Cards>
    </MailDetailsWrapper>
  );
}

export default MailDetail;
