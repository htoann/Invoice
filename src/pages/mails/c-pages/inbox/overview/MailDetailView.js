import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilArrowLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import UilExclamationOctagon from '@iconscout/react-unicons/icons/uil-exclamation-octagon';
import UilPrint from '@iconscout/react-unicons/icons/uil-print';
import UilRedo from '@iconscout/react-unicons/icons/uil-redo';
import { Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../../../components/dropdown/dropdown';
import Heading from '../../../../../components/heading/heading';
import { filterSinglePage, onStarUpdate } from '../../../../../redux/email/actionCreator';
import { MailDetailsWrapper, MessageAction, MessageDetails } from './style';

function Single() {
  const navigate = useNavigate();
  const email = useSelector((state) => state.emailSingle.data[0]);
  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
    if (filterSinglePage) {
      const id = parseInt(params.id, 10);
      dispatch(filterSinglePage(id));
    }
  }, [params.id, dispatch]);

  const onStaredChange = (id) => {
    dispatch(onStarUpdate(id));
  };

  return (
    <MailDetailsWrapper>
      <Cards
        title={
          <MessageAction>
            <Link onClick={() => navigate(-1)} to="#">
              <UilArrowLeft />
            </Link>
            <Tooltip placement="bottom" title="Refresh">
              <NavLink to="#">
                <UilRedo />
              </NavLink>
            </Tooltip>
            {/* <Tooltip placement="bottom" title="Archive">
              <NavLink to="#">
                <UilArchive />
              </NavLink>
            </Tooltip> */}
            <Tooltip placement="bottom" title="Info">
              <NavLink to="#">
                <UilExclamationOctagon />
              </NavLink>
            </Tooltip>
            {/* <Tooltip placement="bottom" title="Delete">
              <NavLink to="#">
                <UilTrash />
              </NavLink>
            </Tooltip> */}
            {/* <Tooltip placement="bottom" title="Read">
              <NavLink to="#">
                <UilBookOpen />
              </NavLink>
            </Tooltip> */}
            {/* <Tooltip placement="bottom" title="Folder">
              <NavLink to="#">
                <UilFolder />
              </NavLink>
            </Tooltip> */}
          </MessageAction>
        }
        // isbutton={
        //   <MailRightAction>
        //     <span>1 - 50 of 235</span>
        //   </MailRightAction>
        // }
      >
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
                  {/* <Link to="#" className="ex-coll">
                    <UilAngleUp />
                    <UilAngleDown />
                  </Link> */}

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
                  {/* <span>
                    <UilPaperclip />
                  </span> */}
                  <span> {moment(email?.id).format('LLL')} </span>
                  <Link
                    className={email?.stared ? 'starActive' : 'starDeactivate'}
                    onClick={() => onStaredChange(email?.id)}
                    to="#"
                  >
                    <FontAwesome name="star-o" />
                  </Link>
                  {/* <Link to="#">
                    <UilCornerUpLeft />
                  </Link>
                  <Link to="#">
                    <UilEllipsisV />
                  </Link> */}
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
                        <img
                          style={{ width: '40px' }}
                          src={require(`../../../../../static/img/files/pdf.png`)}
                          alt="File Logo"
                        />
                      </div>
                      <div className="ninjadash-file-item__content">
                        <span className="ninjadash-ticket-file-name">Product-guidelines.pdf</span>
                        <span className="ninjadash-ticket-file-size">522 KB</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="message-attachments">
                  <div className="ninjadash-ticket-file-item d-flex">
                    <div className="ninjadash-ticket-file-item__info d-flex">
                      <div className="ninjadash-ticket-file-item__logo">
                        <img
                          style={{ width: '40px' }}
                          src={require(`../../../../../static/img/files/csv.png`)}
                          alt="File Logo"
                        />
                      </div>
                      <div className="ninjadash-file-item__content">
                        <span className="ninjadash-ticket-file-name">Product-guidelines.pdf</span>
                        <span className="ninjadash-ticket-file-size">522 KB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </MessageDetails>
          </Col>
        </Row>
      </Cards>
    </MailDetailsWrapper>
  );
}

export default Single;