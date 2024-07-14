import { Cards } from '@/components/cards/frame/cards-frame';
import { Dropdown } from '@/components/dropdown/dropdown';
import Heading from '@/components/heading/heading';
import csvImg from '@/static/img/files/csv.png';
import pdfImg from '@/static/img/files/pdf.png';
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilImport from '@iconscout/react-unicons/icons/uil-import';
import UilPrint from '@iconscout/react-unicons/icons/uil-print';
import { Col, Row } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MailDetailsWrapper, MessageDetails } from './style';

function MailDetail({ selectedInbox: email }) {
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
                    <span className="mail-badge primary">{email?.type}</span>
                  </Heading>
                </div>

                <div className="message-action">
                  <Link to="#">
                    <UilPrint />
                  </Link>
                </div>
              </div>

              <div className="message-box d-flex justify-content-between align-items-center">
                <div className="message-author">
                  <img style={{ width: '60px', borderRadius: '50%' }} src={email?.img} alt="" />
                  <div>
                    <Heading as="h4">{email?.userName}</Heading>
                    <Dropdown
                      placement="bottom"
                      content={
                        <ul className="mail-props">
                          <li>
                            <span>From:</span> <span>{email?.from}</span>{' '}
                          </li>
                          <li>
                            <span>To:</span> <span>{email?.to}</span>{' '}
                          </li>
                          <li>
                            <span>CC:</span> <span>example@gamil.com</span>{' '}
                          </li>
                          <li>
                            <span>Date:</span> <span>{moment(email?.id).format('LLL')}</span>
                          </li>
                        </ul>
                      }
                    >
                      <Link to="#">
                        To {email?.to}
                        <UilAngleDown />
                      </Link>
                    </Dropdown>
                  </div>
                </div>

                <div className="message-excerpt">
                  <span> {moment(email?.id).format('LLL')} </span>
                </div>
              </div>

              <div className="message-body">
                <span className="welcome-text">Hello Adam,</span>
                <p>{email?.body}</p>

                <Heading as="h6">
                  Best Regards <br /> {email?.userName}
                </Heading>
              </div>

              <div style={{ display: 'flex', gap: 10, padding: '10px 0px' }}>
                <div className="message-attachments">
                  <div className="ninjadash-ticket-file-item d-flex">
                    <div className="ninjadash-ticket-file-item__info d-flex">
                      <div className="ninjadash-ticket-file-item__logo">
                        <img style={{ width: '40px' }} src={pdfImg} alt="File Logo" />
                      </div>
                      <div className="ninjadash-file-item__content">
                        <span className="ninjadash-ticket-file-name">Product-guidelines.pdf</span>
                        <span className="ninjadash-ticket-file-size">522 KB</span>
                      </div>
                      <Link className="btn-link" to="#" style={{ marginLeft: 10 }}>
                        <UilImport />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="message-attachments">
                  <div className="ninjadash-ticket-file-item d-flex">
                    <div className="ninjadash-ticket-file-item__info d-flex">
                      <div className="ninjadash-ticket-file-item__logo">
                        <img style={{ width: '40px' }} src={csvImg} alt="File Logo" />
                      </div>
                      <div className="ninjadash-file-item__content">
                        <span className="ninjadash-ticket-file-name">Product-guidelines.pdf</span>
                        <span className="ninjadash-ticket-file-size">522 KB</span>
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
