import { Col, Row, Table } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import BestSeller from '../dashboard/overview/BusinessStatus';
import RevenueGenerated from '../dashboard/overview/RevenueGenerated';
import { Main } from '../styled';
import DragAndDropTable from './DragTable';

function Tables() {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <>
      <PageHeader ghost title="Table" />
      <Main>
        <Row gutter={15}>
          <Col xs={24}>
            <Cards title="Basic Usage">
              <Table className="table-responsive" pagination={false} dataSource={dataSource} columns={columns} />
            </Cards>
          </Col>
          <Col xs={24}>
            <RevenueGenerated />
          </Col>
          <Col xs={24}>
            <BestSeller />
          </Col>
          <Col xs={24}>
            <DragAndDropTable />
          </Col>
        </Row>
      </Main>
    </>
  );
}

export default Tables;
