import { lazy } from 'react';
import { WizardWrapper } from '../Style';

const Checkout = lazy(() => import('../../../ecommerce/overview/CheckoutWizard'));

function WizardsOne() {
  return (
    <WizardWrapper className="invoice-wizard-page">
      <Checkout />
    </WizardWrapper>
  );
}

export default WizardsOne;
