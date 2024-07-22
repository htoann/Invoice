import Heading from '@/components/heading/heading';
import { Main } from '../styled';
import { MaintenanceWrapper } from './style';

function Maintenance() {
  return (
    <Main>
      <MaintenanceWrapper>
        <img src={require(`@/static/img/pages/maintenance.svg`).default} alt="maintenance" />
        <Heading as="h3">We are currently performing maintenance</Heading>
        <p>
          We&rsquo;re making the system more awesome. <br />
          We&rsquo;ll be back shortly.
        </p>
      </MaintenanceWrapper>
    </Main>
  );
}

export default Maintenance;
