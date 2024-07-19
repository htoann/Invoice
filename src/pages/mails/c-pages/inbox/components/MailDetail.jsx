import { Cards } from '@/components/cards/frame/cards-frame';
import { Dropdown } from '@/components/dropdown/dropdown';
import Heading from '@/components/heading/heading';
import csvImg from '@/static/img/files/csv.png';
import pdfImg from '@/static/img/files/pdf.png';
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilImport from '@iconscout/react-unicons/icons/uil-import';
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
              </div>

              <div className="message-box d-flex justify-content-between align-items-center">
                <div className="message-author">
                  <img
                    style={{ width: '40px', borderRadius: '50%' }}
                    src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png"
                    alt=""
                  />
                  <div>
                    <Heading as="h4">{email?.sender.name}</Heading>
                    <Dropdown
                      placement="bottom"
                      content={
                        <ul className="mail-props">
                          <li>
                            <span>From:</span> <span>{email?.sender.email}</span>{' '}
                          </li>
                          <li>
                            <span>To:</span> <span>{email?.receiver.email}</span>{' '}
                          </li>
                          <li>
                            <span>CC:</span> <span>example@gamil.com</span>{' '}
                          </li>
                          <li>
                            <span>Date:</span> <span>{moment(email?.created_at).format('LLL')}</span>
                          </li>
                        </ul>
                      }
                    >
                      <Link to="#">
                        To {email?.receiver?.name}
                        <UilAngleDown />
                      </Link>
                    </Dropdown>
                  </div>
                </div>

                <div className="message-excerpt">
                  <span> {moment(email?.created_at).format('LLL')} </span>
                </div>
              </div>

              <div className="message-body">
                {/* <span className="welcome-text">Hello Adam,</span> */}
                <p>{email?.body}</p>
                {/* <Heading as="h6">
                  Best Regards <br /> {email?.userName}
                </Heading> */}
              </div>

              <div style={{ display: 'flex', gap: 10, padding: '10px 0px', flexWrap: 'wrap' }}>
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
                        <img style={{ width: '40px' }} src={csvImg} alt="File Logo" />
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
