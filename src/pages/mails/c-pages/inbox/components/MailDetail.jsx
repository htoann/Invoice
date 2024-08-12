import { Cards } from '@/components/cards/frame/cards-frame';
import Heading from '@/components/heading/heading';
import { Popover } from '@/components/popup/popup';
// import csvImg from '@/static/img/files/csv.png';
// import pdfImg from '@/static/img/files/pdf.png';
import AttachmentLogo from '@/static/img/files/attach2.png';
import { API_ENDPOINT, formatDataSize, formatTime } from '@/utils/index';
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilImport from '@iconscout/react-unicons/icons/uil-import';
import { Avatar, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MailDetailsWrapper, MessageDetails } from './style';

function MailDetail({ selectedInbox: email }) {
  const { t } = useTranslation();

  const cleanedBody = email?.body?.replace(/<style[\s\S]*?<\/style>/gi, '');

  return (
    <MailDetailsWrapper>
      <Cards headless>
        <Row gutter={15} style={{ maxHeight: 'calc(100vh - 254px)' }}>
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

              <div className="message-box d-flex justify-content-between align-items-center">
                <div className="message-author">
                  <Avatar size={48} style={{ backgroundColor: '#8231D3' }}>
                    {email?.sender?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <div>
                    <Heading as="h4">{email?.sender}</Heading>
                    <Popover
                      content={
                        <ul className="mail-props">
                          <li>
                            <span>{t('Common_From')}:</span> <span>{email?.sender}</span>{' '}
                          </li>
                          <li>
                            <span>{t('Common_To')}:</span> <span>{email?.receiver}</span>{' '}
                          </li>
                          {email?.cc && email?.cc !== '()' && (
                            <li>
                              <span>{t('Common_CC')}:</span> <span>{email?.cc}</span>{' '}
                            </li>
                          )}
                          {email?.bcc && email?.bcc !== '()' && (
                            <li>
                              <span>{t('Common_BCC')}:</span> <span>{email?.bcc}</span>{' '}
                            </li>
                          )}
                          <li>
                            <span>{t('Common_Date')}:</span>{' '}
                            <span>{formatTime(email?.date, 'HH:mm D MMMM, YYYY')}</span>
                          </li>
                        </ul>
                      }
                    >
                      <Link to="#">
                        {t('Common_To')} {email?.receiver}
                        <UilAngleDown />
                      </Link>
                    </Popover>
                  </div>
                </div>

                <div className="message-excerpt">
                  <span>{formatTime(email?.date, 'HH:mm D MMMM, YYYY')}</span>
                </div>
              </div>

              <div className="message-body" dangerouslySetInnerHTML={{ __html: cleanedBody }} />

              {!!email?.attachments?.length && (
                <>
                  <hr style={{ marginTop: 30, marginBottom: 15, marginLeft: 60 }} />
                  <p style={{ paddingLeft: 60, fontWeight: 600, marginBottom: 10 }}>
                    {email?.attachments?.length} {t('Mail_Attachments')}
                  </p>
                </>
              )}

              {/* <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {email?.attachments?.length > 0 &&
                  email?.attachments.map((item) => (
                    <div className="message-attachments" key={item.id}>
                      <div className="invoice-ticket-file-item d-flex">
                        <div className="invoice-ticket-file-item__info d-flex">
                          <div className="invoice-ticket-file-item__logo">
                            <img style={{ width: '40px' }} src={AttachmentLogo} alt="File Logo" />
                          </div>
                          <div className="invoice-file-item__content">
                            <span className="invoice-ticket-file-name">{item.file_name}</span>
                            <span className="invoice-ticket-file-size">{formatDataSize(item.size)}</span>
                          </div>
                          <Link
                            className="btn-link"
                            to={`${API_ENDPOINT}/mails/attachments/${item.id}`}
                            style={{ marginLeft: 10 }}
                            target="_blank"
                          >
                            <UilImport />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div> */}

              <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: 40 }}>
                {email?.attachments?.length > 0 &&
                  email?.attachments.map((item) => (
                    <div className="message-attachments" key={item.id}>
                      <figure style={{ width: 150 }}>
                        <div className="attachment-image">
                          <img
                            src={AttachmentLogo}
                            alt=""
                            width={60}
                            height={60}
                            style={{ display: 'flex', margin: 'auto' }}
                          />
                        </div>
                        <div className="attachment-hover">
                          <Link
                            className="btn-link"
                            to={`${API_ENDPOINT}/mails/attachments/${item.id}`}
                            target="_blank"
                          >
                            <UilImport />
                          </Link>
                        </div>
                        <figcaption>
                          <Heading as="h4">
                            <div
                              style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                              }}
                              title={item.file_name}
                            >
                              {item.file_name}
                            </div>
                          </Heading>
                          <p>{formatDataSize(item.size)}</p>
                        </figcaption>
                      </figure>
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
