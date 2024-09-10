import { Button } from '@/components/buttons/buttons';
import Heading from '@/components/heading';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Main } from '../styled';
import { ErrorWrapper } from './style';

function NotFound() {
  const { t } = useTranslation();

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
          <img src={require(`@/static/img/pages/404.svg`).default} alt="404" />
          <Heading className="error-text" as="h3">
            404
          </Heading>
          <p>{t('Common_PageNotFound')}</p>
          <NavLink to="/">
            <Button size="default" type="primary" to="/">
              {t('Common_ReturnHome')}
            </Button>
          </NavLink>
        </ErrorWrapper>
      )}
    </Main>
  );
}

export default NotFound;
