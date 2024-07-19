import UilEllipsisH from '@iconscout/react-unicons/icons/uil-ellipsis-h';
import { Col, Pagination, Progress, Row, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Dropdown } from '../../../components/dropdown/dropdown';
import Heading from '../../../components/heading/heading';
import { ProjectList, ProjectListAssignees, ProjectListTitle, ProjectPagination } from '../style';

function ProjectLists() {
  const project = useSelector((state) => state.projects.data);
  const [state, setState] = useState({
    projects: project,
    current: 0,
    pageSize: 0,
  });
  const { projects } = state;

  useEffect(() => {
    if (project) {
      setState({
        projects: project,
      });
    }
  }, [project]);

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  const dataSource = [];

  if (projects.length)
    projects.map((value) => {
      const { id, title, status, category, percentage } = value;
      return dataSource.push({
        key: id,
        project: (
          <ProjectListTitle>
            <Heading as="h4">
              <Link to={`/project/projectDetails/${id}`}>{title}</Link>
            </Heading>

            <p>{category}</p>
          </ProjectListTitle>
        ),
        startDate: <span className="date-started">26 Dec 2019</span>,
        deadline: <span className="date-finished">18 Mar 2020</span>,
        assigned: (
          <ProjectListAssignees>
            <ul>
              <li>
                <img src={require(`../../../static/img/users/1.png`)} alt="" />
              </li>
              <li>
                <img src={require(`../../../static/img/users/2.png`)} alt="" />
              </li>
              <li>
                <img src={require(`../../../static/img/users/3.png`)} alt="" />
              </li>
              <li>
                <img src={require(`../../../static/img/users/4.png`)} alt="" />
              </li>
              <li>
                <img src={require(`../../../static/img/users/5.png`)} alt="" />
              </li>
              <li>
                <img src={require(`../../../static/img/users/6.png`)} alt="" />
              </li>
              <li>
                <img src={require(`../../../static/img/users/7.png`)} alt="" />
              </li>
            </ul>
          </ProjectListAssignees>
        ),
        status: <Tag className={status}>{status}</Tag>,
        completion: (
          <div className="project-list-progress">
            <Progress percent={status === 'complete' ? 100 : percentage} strokeWidth={5} className="progress-primary" />
            <p>12/15 Task Completed</p>
          </div>
        ),
        action: (
          <Dropdown
            className="wide-dropdown"
            content={
              <>
                <Link to="#">View</Link>
                <Link to="#">Edit</Link>
                <Link to="#">Delete</Link>
              </>
            }
          >
            <Link to="#">
              <UilEllipsisH />
            </Link>
          </Dropdown>
        ),
      });
    });

  const columns = [
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Assigned To',
      dataIndex: 'assigned',
      key: 'assigned',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Completion',
      dataIndex: 'completion',
      key: 'completion',
    },

    {
      title: '',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Cards headless>
          <ProjectList>
            <div className="table-responsive">
              <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
          </ProjectList>
        </Cards>
      </Col>
      <Col xs={24} className="pb-30">
        <ProjectPagination>
          {projects.length ? (
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={10}
              defaultCurrent={1}
              total={40}
            />
          ) : null}
        </ProjectPagination>
      </Col>
    </Row>
  );
}

export default ProjectLists;
