import { Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { BreadcrumbWrapper, HeaderContent, HeaderWrapper, Title, TitleSection } from './style';

function PageHeader(props) {
  const { title, routes, className } = props;

  const breadcrumb = routes ? (
    <Breadcrumb separator={<span className="invoice-separator" />}>
      {routes.map((route, index) =>
        index + 1 === routes.length ? (
          <Breadcrumb.Item key={index}>{route.breadcrumbName}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index}>
            <ReactSVG src={require(`@/static/img/icon/home.svg`).default} />
            <Link to={route.path}>{route.breadcrumbName}</Link>
          </Breadcrumb.Item>
        ),
      )}
    </Breadcrumb>
  ) : null;

  return (
    <HeaderWrapper className={className}>
      <HeaderContent>
        <TitleSection>{title && <Title>{title}</Title>}</TitleSection>
      </HeaderContent>
      <BreadcrumbWrapper>{breadcrumb}</BreadcrumbWrapper>
    </HeaderWrapper>
  );
}

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  bgColor: PropTypes.string,
  className: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  buttons: PropTypes.array,
};

export { PageHeader };
