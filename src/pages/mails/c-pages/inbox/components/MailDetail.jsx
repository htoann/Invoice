import { Cards } from '@/components/cards/frame/cards-frame';
import Heading from '@/components/heading/heading';
import { Popover } from '@/components/popup/popup';
// import csvImg from '@/static/img/files/csv.png';
// import pdfImg from '@/static/img/files/pdf.png';
import { attachments } from '@/mock/mails/attachments';
import { formatTime } from '@/utils/index';
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilImport from '@iconscout/react-unicons/icons/uil-import';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MailDetailsWrapper, MessageDetails } from './style';
import { downloadAttachment } from './utils';

function MailDetail({ selectedInbox: email }) {
  const { t } = useTranslation();

  const cleanedBody = email?.body?.replace(/<style[\s\S]*?<\/style>/gi, '');

  const handleDownloadAttachment = async (attachment) => {
    await downloadAttachment(attachment);
  };

  return (
    <MailDetailsWrapper>
      <Cards headless>
        <Row gutter={15}>
          <Col>
            <MessageDetails>
              <div className="d-flex justify-content-between align-items-center">
                <div className="message-subject">
                  <Heading as="h2">
                    {email?.subject}
                    <span className="mail-badge primary">{email?.type || 'Inbox'}</span>
                  </Heading>
                </div>
              </div>

              <div className="message-box d-flex justify-content-between align-items-center">
                <div className="message-author">
                  <img
                    style={{ width: '40px', borderRadius: '50%' }}
                    src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"
                    alt=""
                  />
                  <div>
                    <Heading as="h4">{email?.sender}</Heading>
                    <Popover
                      content={
                        <ul className="mail-props">
                          <li>
                            <span>{t('Common_From')}:</span> <span>{email?.sender}</span>{' '}
                          </li>
                          <li>
                            <span>{t('Common_To')}:</span> <span>{email?.receiver || 'me'}</span>{' '}
                          </li>
                          <li>
                            <span>{t('Common_Date')}:</span>{' '}
                            <span>{formatTime(email?.date, 'MMMM D, YYYY h:mm A')}</span>
                          </li>
                        </ul>
                      }
                    >
                      <Link to="#">
                        {t('Common_To')} {email?.receiver || 'me'}
                        <UilAngleDown />
                      </Link>
                    </Popover>
                  </div>
                </div>

                <div className="message-excerpt">
                  <span>{formatTime(email?.date, 'MMMM D, YYYY h:mm A')}</span>
                </div>
              </div>

              <div className="message-body" dangerouslySetInnerHTML={{ __html: cleanedBody }} />

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 40 }}>
                {attachments?.length > 0 &&
                  attachments.map((item) => (
                    <div className="message-attachments" key={item.id}>
                      <div className="invoice-ticket-file-item d-flex">
                        <div className="invoice-ticket-file-item__info d-flex">
                          <div className="invoice-ticket-file-item__logo">
                            <img
                              style={{ width: '40px' }}
                              src={require(`@/static/img/files/${item.type}.png`)}
                              alt="File Logo"
                            />
                          </div>
                          <div className="invoice-file-item__content">
                            <span className="invoice-ticket-file-name">{item.file_name}</span>
                            <span className="invoice-ticket-file-size">{item.file_size}</span>
                          </div>
                          <Link
                            className="btn-link"
                            to="#"
                            style={{ marginLeft: 10 }}
                            onClick={() => handleDownloadAttachment(item)}
                          >
                            <UilImport />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </MessageDetails>
          </Col>
        </Row>
      </Cards>
    </MailDetailsWrapper>
  );
}

export default MailDetail;
