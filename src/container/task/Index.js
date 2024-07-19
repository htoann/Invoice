import UilAngleLeft from '@iconscout/react-unicons/icons/uil-angle-left';
import UilAngleRight from '@iconscout/react-unicons/icons/uil-angle-right';
import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilStar from '@iconscout/react-unicons/icons/uil-star';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { Col, Form, Input, Modal, Row, Spin } from 'antd';
import { lazy, Suspense, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { taskAddData } from '../../redux/task/actionCreator';
import { BasicFormWrapper, Main } from '../styled';
import { FixedSidebar, SidebarWrap } from './style';

const All = lazy(() => import('./overview/all'));
const Favourites = lazy(() => import('./overview/favourites'));
const Completed = lazy(() => import('./overview/completed'));

function Task() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Task',
    },
  ];
  const [form] = Form.useForm();
  // const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { taskData } = useSelector((state) => {
    return {
      taskData: state.Task.data,
    };
  });

  const [state, setState] = useState({
    responsive: 0,
    collapsed: false,
    visible: false,
    modalType: 'primary',
  });

  const showModal = () => {
    setState({
      ...state,
      visible: true,
      collapsed: false,
    });
  };

  const handleCancel = () => {
    setState({
      ...state,
      visible: false,
    });
  };

  const handleAddTask = (values) => {
    handleCancel();
    const arrayData = [];
    taskData.map((data) => {
      return arrayData.push(data.id);
    });

    const max = Math.max(...arrayData);
    dispatch(
      taskAddData([
        ...taskData,
        {
          ...values,
          id: max + 1,
          favourite: false,
          completed: false,
        },
      ]),
    );
  };

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

  const path = '/app/task';
  return (
    <>
      <PageHeader className="invoice-page-header-main" title="Task" routes={PageRoutes} />
      <Main>
        <Row gutter={25}>
          <Col xxl={5} lg={6} md={7} xs={24}>
            {responsive > 767 ? (
              <>
                <SidebarWrap className="mb-30">
                  <div className="invoice-taskApp-sidebar">
                    <Button className="invoice-btn-add" size="large" type="primary" raised onClick={showModal}>
                      <UilPlus />
                      Add Task
                    </Button>
                    <ul className="invoice-taskApp-sidebar__nav">
                      <li className="invoice-taskApp-sidebar__nav--item">
                        <NavLink className="invoice-taskApp-sidebar__nav--link" to={`${path}/all`}>
                          <span className="nav-item-icon">
                            <UilEdit />
                          </span>
                          <span className="nav-item-text">All</span>
                        </NavLink>
                      </li>
                      <li className="invoice-taskApp-sidebar__nav--item">
                        <NavLink className="invoice-taskApp-sidebar__nav--link" to={`${path}/favourites`}>
                          <span className="nav-item-icon">
                            <UilStar />
                          </span>
                          <span className="nav-item-text">Favourite</span>
                        </NavLink>
                      </li>
                      <li className="invoice-taskApp-sidebar__nav--item">
                        <NavLink className="invoice-taskApp-sidebar__nav--link" to={`${path}/completed`}>
                          <span className="nav-item-icon">
                            <UilCheck />
                          </span>
                          <span className="nav-item-text">Completed</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </SidebarWrap>
                <Modal
                  title="Add Task"
                  className="invoice-addTask-modal"
                  type={state.modalType}
                  open={state.visible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <div className="invoice-addTask-modal-inner">
                    <BasicFormWrapper>
                      <Form form={form} name="add-task" onFinish={handleAddTask}>
                        <Form.Item rules={[{ required: true, message: 'Please add a Title' }]} name="title">
                          <Input placeholder="Title" size="middle" />
                        </Form.Item>

                        <Form.Item name="description">
                          <Input.TextArea rows={4} placeholder="Add Description" />
                        </Form.Item>
                        <div className="invoice-modal-actions">
                          <Button size="small" type="white" key="cancel" outlined onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button htmlType="submit" size="small" type="primary" key="submit">
                            Add Task
                          </Button>
                        </div>
                      </Form>
                    </BasicFormWrapper>
                  </div>
                </Modal>
              </>
            ) : (
              <FixedSidebar className={collapsed ? 'show' : 'hide'}>
                <Link to="#" type="link" className="trigger-close" onClick={toggleCollapsed}>
                  <UilTimes />
                </Link>
                <SidebarWrap className="mb-30">
                  <div className="invoice-taskApp-sidebar">
                    <Button className="invoice-btn-add" size="large" type="primary" raised onClick={showModal}>
                      <UilPlus />
                      Add Task
                    </Button>
                    <ul className="invoice-taskApp-sidebar__nav">
                      <li className="invoice-taskApp-sidebar__nav--item">
                        <NavLink className="invoice-taskApp-sidebar__nav--link" to={`${path}/all`}>
                          <span className="nav-item-icon">
                            <UilEdit />
                          </span>
                          <span className="nav-item-text">All</span>
                        </NavLink>
                      </li>
                      <li className="invoice-taskApp-sidebar__nav--item">
                        <NavLink className="invoice-taskApp-sidebar__nav--link" to={`${path}/favourites`}>
                          <span className="nav-item-icon">
                            <UilStar />
                          </span>
                          <span className="nav-item-text">Favourite</span>
                        </NavLink>
                      </li>
                      <li className="invoice-taskApp-sidebar__nav--item">
                        <NavLink className="invoice-taskApp-sidebar__nav--link" to={`${path}/completed`}>
                          <span className="nav-item-icon">
                            <UilCheck />
                          </span>
                          <span className="nav-item-text">Completed</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </SidebarWrap>
                <Modal
                  title="Add Task"
                  className="invoice-addTask-modal"
                  type={state.modalType}
                  open={state.visible}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <div className="invoice-addTask-modal-inner">
                    <BasicFormWrapper>
                      <Form form={form} name="add-task" onFinish={handleAddTask}>
                        <Form.Item rules={[{ required: true, message: 'Please add a Title' }]} name="title">
                          <Input placeholder="Title" />
                        </Form.Item>

                        <Form.Item name="description">
                          <Input.TextArea rows={4} placeholder="Add Description" />
                        </Form.Item>
                        <div className="invoice-modal-actions">
                          <Button size="small" type="white" key="cancel" outlined onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button htmlType="submit" size="small" type="primary" key="submit">
                            Add Task
                          </Button>
                        </div>
                      </Form>
                    </BasicFormWrapper>
                  </div>
                </Modal>
              </FixedSidebar>
            )}
          </Col>
          <Col xxl={19} lg={18} md={17} xs={24}>
            {responsive <= 767 && (
              <div className="sidebar-trier-wrap text-center mb-30">
                <Button type="link" className="sidebar-trigger" style={{ marginTop: 0 }} onClick={toggleCollapsed}>
                  {collapsed ? <UilAngleLeft /> : <UilAngleRight />}
                </Button>
              </div>
            )}
            <Suspense
              fallback={
                <div className="spin">
                  <Spin />
                </div>
              }
            >
              <Routes>
                <Route path="all" element={<All />} />
                <Route path="favourites" element={<Favourites />} />
                <Route path="completed" element={<Completed />} />
              </Routes>
            </Suspense>
          </Col>
        </Row>
        <span
          onKeyPress={() => {}}
          role="button"
          tabIndex="0"
          className={collapsed ? 'overlay-dark show' : 'overlay-dark'}
          onClick={toggleCollapsed}
        />
      </Main>
    </>
  );
}

export default Task;
