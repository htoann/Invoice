import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { KnowledgebaseTopWrap } from '../style';

function GeneralKnowledgeTop() {
  return (
    <KnowledgebaseTopWrap>
      <div className="invoice-knowledgetop">
        <div className="invoice-knowledgetop__search--form">
          <Form name="login" layout="vertical">
            <div className="invoice-knowledgetop__formInner">
              <Form.Item>
                <Select defaultValue="All Products">
                  <Select.Option value="email">Email</Select.Option>
                  <Select.Option value="message">Message</Select.Option>
                  <Select.Option value="event">Event</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="invoice-search-input">
                <Input placeholder="Search anything" />
              </Form.Item>
              <Form.Item>
                <Button className="btn-search" htmlType="submit" type="primary" size="large">
                  Search
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </KnowledgebaseTopWrap>
  );
}

export default GeneralKnowledgeTop;
