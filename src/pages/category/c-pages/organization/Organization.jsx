import { PageHeader } from '@/components/page-header';
import { Main } from '@/container/style';
import { Row } from 'antd';
import { useAppState } from 'context/AppContext';
import { useGetOrgStructure } from 'hooks/useGetOrgStructure';
import { useTranslation } from 'react-i18next';
import BranchList from './c-pages/Branch';
import DepartmentList from './c-pages/Department';
import ProjectList from './c-pages/Project';

export const Organization = () => {
  const { t } = useTranslation();
  const { selectedBranchId, selectedDepartmentId } = useAppState();

  useGetOrgStructure();

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_OrgStructure')} />
      <Main>
        <Row gutter={15}>
          <BranchList />
          {selectedBranchId && <DepartmentList />}
          {selectedDepartmentId && <ProjectList />}
        </Row>
      </Main>
    </>
  );
};

export default Organization;
