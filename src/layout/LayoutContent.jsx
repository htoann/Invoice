import { Cards } from '@/components/card';
import { BorderLessHeading, Main } from '@/container/style';
import { Col, Row } from 'antd';

export const LayoutContent = ({ children, rowProps, colProps, borderLessHeading, cards, cardsProps }) => (
  <Main>
    <Row gutter={15} {...rowProps}>
      <Col xs={24} {...colProps}>
        {borderLessHeading ? (
          <BorderLessHeading>{cards ? <Cards {...cardsProps}>{children}</Cards> : children}</BorderLessHeading>
        ) : cards ? (
          <Cards {...cardsProps}>{children}</Cards>
        ) : (
          children
        )}
      </Col>
    </Row>
  </Main>
);
