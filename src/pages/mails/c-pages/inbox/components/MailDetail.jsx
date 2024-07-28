import { Cards } from '@/components/cards/frame/cards-frame';
import Heading from '@/components/heading/heading';
import { Popover } from '@/components/popup/popup';
import csvImg from '@/static/img/files/csv.png';
import pdfImg from '@/static/img/files/pdf.png';
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilImport from '@iconscout/react-unicons/icons/uil-import';
import { Col, Row } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MailDetailsWrapper, MessageDetails } from './style';

function MailDetail({ selectedInbox: email }) {
  const { t } = useTranslation();

  const cleanedBody = email?.body?.replace(/<style[\s\S]*?<\/style>/gi, '');

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
                            <span>{t('Common_Date')}:</span> <span>{moment(email?.date).format('LLL')}</span>
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
                  <span>{moment(email?.created_at).format('LLL')}</span>
                </div>
              </div>

              <div className="message-body" dangerouslySetInnerHTML={{ __html: cleanedBody }} />

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <div className="message-attachments">
                  <div className="invoice-ticket-file-item d-flex">
                    <div className="invoice-ticket-file-item__info d-flex">
                      <div className="invoice-ticket-file-item__logo">
                        <img style={{ width: '40px' }} src={pdfImg} alt="File Logo" />
                      </div>
                      <div className="invoice-file-item__content">
                        <span className="invoice-ticket-file-name">Product-guidelines.pdf</span>
                        <span className="invoice-ticket-file-size">522 KB</span>
                      </div>
                      <Link className="btn-link" to="#" style={{ marginLeft: 10 }}>
                        <UilImport />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="message-attachments">
                  <div className="invoice-ticket-file-item d-flex">
                    <div className="invoice-ticket-file-item__info d-flex">
                      <div className="invoice-ticket-file-item__logo">
                        <img style={{ width: '40px' }} src={csvImg} alt={t('Mail_Detail_FileLogo')} />
                      </div>
                      <div className="invoice-file-item__content">
                        <span className="invoice-ticket-file-name">Product-guidelines.pdf</span>
                        <span className="invoice-ticket-file-size">522 KB</span>
                      </div>
                      <Link className="btn-link" to="#" style={{ marginLeft: 10 }}>
                        <UilImport />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </MessageDetails>
          </Col>
        </Row>
      </Cards>
    </MailDetailsWrapper>
  );
}

export default MailDetail;
