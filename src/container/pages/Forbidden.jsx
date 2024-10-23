import { Button } from '@/components/button';
import Heading from '@/components/heading';
import img404 from '@/static/img/pages/404.svg';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Main } from '../style';
import { ErrorWrapper } from './style';

function Forbidden() {
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
          <img src={img404} alt="403" />
          <Heading className="error-text" as="h3">
            403
          </Heading>
          <p>{t('Common_Forbidden')}</p>
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

export default Forbidden;
