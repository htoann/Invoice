import { idGenerator } from '@/utils/index';
import UilLeft from '@iconscout/react-unicons/icons/uil-arrow-left';
import UilImport from '@iconscout/react-unicons/icons/uil-import';
import UilMessage from '@iconscout/react-unicons/icons/uil-message';
import UilSmile from '@iconscout/react-unicons/icons/uil-smile';
import UilUpload from '@iconscout/react-unicons/icons/uil-upload';
import { Col, List, Row, Select, Spin } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import { singlePageReade, ticketUpdateData } from '../../redux/supportTickets/actionCreator';
import { Main } from '../styled';
import { ClientConversation, TicketDetailsBox } from './Style';

const PageRoutes = [
  {
    path: 'index',
    breadcrumbName: 'Dashboard',
  },
  {
    path: 'app',
    breadcrumbName: 'Apps',
  },
  {
    path: 'first',
    breadcrumbName: 'Tickets',
  },
];

function SupportTicketDetails() {
  const { dataState, allTickets } = useSelector((state) => {
    return {
      dataState: state.tickets.ticket,
      allTickets: state.tickets.data,
    };
  });
  const [state, setState] = useState({
    inputValue: '',
  });
  const [pickerShow, setPickerShow] = useState(false);
  const { inputValue } = state;

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (dispatch) {
      dispatch(singlePageReade(params.id));
    }
  }, [dispatch, params.id]);

  const handleUpdatePriority = (values) => {
    const newData = allTickets.map((item) => {
      if (item.id === params.id) {
        const newItem = { ...item };
        newItem.priority = values;
        return newItem;
      }
      return item;
    });

    dispatch(ticketUpdateData(newData));
    dispatch(singlePageReade(params.id));
  };

  const handleUpdateStatus = (values) => {
    const newData = allTickets.map((item) => {
      if (item.id === params.id) {
        const newItem = { ...item };
        newItem.status = values;
        return newItem;
      }
      return item;
    });

    dispatch(ticketUpdateData(newData));
    dispatch(singlePageReade(params.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { conversations } = dataState[0].user;
    const id = idGenerator(conversations, 1);
    conversations.push({
      id,
      name: 'Daniel Pink',
      chat: inputValue,
      img: 'static/img/users/2.png',
      time: 'Just Now',
    });

    const newData = allTickets.map((item) => {
      if (item.id === params.id) {
        const newItem = { ...item };
        newItem.user.conversations = conversations;
        return newItem;
      }
      return item;
    });

    dispatch(ticketUpdateData(newData));
    dispatch(singlePageReade(params.id));
    setState({
      inputValue: '',
    });
  };

  const onPickerShow = () => {
    setPickerShow(!pickerShow);
  };

  const handleChange = (e) => {
    setState({
      ...state,
      inputValue: e.target.value,
    });
  };

  return (
    <>
      <PageHeader
        className="invoice-page-header-main"
        title={
          <>
            <h4>Ticket Details</h4>
          </>
        }
        routes={PageRoutes}
      />
      <Main>
        {dataState.length ? (
          <TicketDetailsBox>
            <Row gutter={15}>
              <Col xs={24}>
                <Link
                  className="invoice-back-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.back();
                  }}
                  to="#"
                >
                  <UilLeft /> Go back
                </Link>
              </Col>
              <Col lg={16} xs={24}>
                <div className="invoice-ticket-details">
                  <Cards headless title={dataState[0].subject}>
                    <Row>
                      <Col md={8} xs={24}>
                        <div className="invoice-ticket-author">
                          <h4 className="invoice-ticket-details__top-title">Requested By:</h4>
                          <div className="invoice-ticket-author__info">
                            <img style={{ width: '30px' }} src={require(`../../${dataState[0].user.img}`)} alt="" />
                            <span className="invoice-ticket-author__name">{dataState[0].user.name}</span>
                          </div>
                          <h4>Priority</h4>
                          <Select
                            onChange={handleUpdatePriority}
                            style={{ width: '200px' }}
                            defaultValue={dataState[0].priority}
                          >
                            <Select.Option value="Low">Low</Select.Option>
                            <Select.Option value="Medium">Medium</Select.Option>
                            <Select.Option value="High">High</Select.Option>
                          </Select>
                        </div>
                      </Col>
                      <Col md={8} xs={24}>
                        <div className="invoice-ticket-date-info">
                          <div className="invoice-ticket-date-info__text">
                            <h4 className="invoice-ticket-details__top-title">Created Date</h4>
                            <span>January 20, 2020</span>
                          </div>
                          <h4>Status</h4>
                          <Select
                            onChange={handleUpdateStatus}
                            style={{ width: '200px' }}
                            defaultValue={dataState[0].status}
                          >
                            <Select.Option value="Close">Close</Select.Option>
                            <Select.Option value="Open">Open</Select.Option>
                            <Select.Option value="Pending">Pending</Select.Option>
                          </Select>
                        </div>
                      </Col>
                      <Col md={8} xs={24}>
                        <div className="invoice-ticket-date-info">
                          <div className="invoice-ticket-date-info__text">
                            <h4 className="invoice-ticket-details__top-title">Updated Date</h4>
                            <span>February 02, 2020</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <div className="invoice-ticket-overview">
                      <h4 className="invoice-ticket-overview__title">Overview :</h4>
                      <p>{dataState[0].description}</p>
                    </div>
                  </Cards>
                </div>
                <ClientConversation>
                  <Cards headless title="Conversation">
                    <List
                      className="invoice-client-conversation-list"
                      dataSource={dataState[0].user.conversations}
                      renderItem={(item) => (
                        <List.Item key={item.email}>
                          <List.Item.Meta
                            className="invoice-status-online"
                            avatar={<Avatar shape="square" src={require(`../../${item.img}`)} />}
                            title={<Link to="#">{item.name}</Link>}
                            description={item.chat}
                          />
                          <span className="invoice-conversation-time">{item.time}</span>
                        </List.Item>
                      )}
                    />
                    <div className="chatbox-reply-form-wrap">
                      <form onSubmit={handleSubmit}>
                        <div className="chatbox-reply-form d-flex">
                          <div className="chatbox-reply-input">
                            <span className="smile-icon">
                              <Link onClick={onPickerShow} to="#">
                                <UilSmile />
                              </Link>
                            </span>
                            <input
                              onChange={handleChange}
                              placeholder="Type your message..."
                              name="chat"
                              id="chat"
                              style={{ width: '100%' }}
                              value={inputValue}
                            />
                          </div>
                          <div className="chatbox-reply-action d-flex">
                            <Button onClick={handleSubmit} type="primary" className="btn-send">
                              <UilMessage />
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Cards>
                </ClientConversation>
              </Col>
              <Col lg={8} xs={24}>
                <div className="invoice-ticket-file-system">
                  <Cards bordered={false} title="File Attachment">
                    <div className="invoice-ticket-file-list">
                      <div className="invoice-ticket-file-item d-flex">
                        <div className="invoice-ticket-file-item__info d-flex">
                          <div className="invoice-ticket-file-item__logo">
                            <img
                              style={{ width: '40px' }}
                              src={require(`../../static/img/files/zip.png`)}
                              alt="File Logo"
                            />
                          </div>
                          <div className="invoice-file-item__content">
                            <span className="invoice-ticket-file-name">Main-admin-design.zip</span>
                            <span className="invoice-ticket-file-size">7.05 MB</span>
                          </div>
                        </div>
                        <Link className="invoice-ticket-file-item__action" to="#">
                          <UilUpload />
                        </Link>
                      </div>
                      {/* End of .file-list__single */}
                      <div className="invoice-ticket-file-item d-flex">
                        <div className="invoice-ticket-file-item__info d-flex">
                          <div className="invoice-ticket-file-item__logo">
                            <img
                              style={{ width: '40px' }}
                              src={require(`../../static/img/files/pdf.png`)}
                              alt="File Logo"
                            />
                          </div>
                          <div className="invoice-file-item__content">
                            <span className="invoice-ticket-file-name">Product-guidelines.pdf</span>
                            <span className="invoice-ticket-file-size">522 KB</span>
                          </div>
                        </div>
                        <Link className="invoice-ticket-file-item__action" to="#">
                          <UilUpload />
                        </Link>
                      </div>
                      {/* End of .file-list__single */}
                      <div className="invoice-ticket-file-item d-flex">
                        <div className="invoice-ticket-file-item__info d-flex">
                          <div className="invoice-ticket-file-item__logo">
                            <img
                              style={{ width: '40px' }}
                              src={require(`../../static/img/files/psd.png`)}
                              alt="File Logo"
                            />
                          </div>
                          <div className="invoice-ticket-file-item__content">
                            <span className="invoice-ticket-file-name">admin-wireframe.psd</span>
                            <span className="invoice-ticket-file-size">2.05 MB</span>
                          </div>
                        </div>
                        <Link className="invoice-ticket-file-item__action" to="#">
                          <UilImport />
                        </Link>
                      </div>
                    </div>
                  </Cards>
                </div>
              </Col>
            </Row>
          </TicketDetailsBox>
        ) : (
          <Cards headless>
            <Spin />
          </Cards>
        )}
      </Main>
    </>
  );
}

export default SupportTicketDetails;
