import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import Heading from '../../components/heading/heading';
import { Main } from '../styled';
import { ErrorWrapper } from './style';

function NotFound() {
  const [state, setState] = useState({
    isLoading: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setState({ isLoading: false });
    }, 1500);
  }, []);

  return (
    <Main>
      {state.isLoading ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        <ErrorWrapper>
          <img src={require(`../../static/img/pages/404.svg`).default} alt="404" />
          <Heading className="error-text" as="h3">
            404
          </Heading>
          <p>Sorry! the page you are looking for does not exist.</p>
          <NavLink to="/">
            <Button size="default" type="primary" to="/">
              Return Home
            </Button>
          </NavLink>
        </ErrorWrapper>
      )}
    </Main>
  );
}

export default NotFound;
