import UilBook from '@iconscout/react-unicons/icons/uil-book-alt';
import UilClock from '@iconscout/react-unicons/icons/uil-clock';
import { Card, Col } from 'antd';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CourseCardWrap } from './Style';

function CourseCard({ courseData }) {
  const { id, thumbnail, title, author, authorImg, price, duration, lectures } = courseData;
  return (
    <Col xxl={6} lg={8} sm={12} xs={24}>
      <CourseCardWrap className="invoice-course-card-single">
        <Card bordered={false}>
          <div className="invoice-course-card-thumbnail">
            <img src={require(`@/static/img/courses/${thumbnail}`)} alt="invoice" />
          </div>
          <div className="invoice-course-card-content">
            <h4 className="invoice-course-card-title">
              <Link to={`/app/course/courseDetails/${id}`}>{title}</Link>
            </h4>
            <div className="invoice-course-card-author">
              <img src={require(`@/static/img/avatar/${authorImg}`)} alt="invoice" />
              <span className="invoice-course-card-author__name">{author}</span>
            </div>
            <div className="invoice-course-card-meta">
              <div className="invoice-course-card-meta__left">
                <span className="invoice-course-card-meta__pricing">${price}</span>
              </div>
              <ul className="invoice-course-card-meta__right">
                <li className="bg-secondary">
                  <UilBook />
                  <span>{lectures} Lectures</span>
                </li>
                <li className="bg-primary">
                  <UilClock />
                  <span>{duration} Hrs</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </CourseCardWrap>
    </Col>
  );
}

CourseCard.propTypes = {
  courseData: propTypes.object,
};

export default CourseCard;
