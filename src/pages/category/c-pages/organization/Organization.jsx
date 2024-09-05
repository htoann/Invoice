import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '@/container/styled';
import { Row } from 'antd';
import { useOrgStructure } from 'hooks/org-structure';
import { useTranslation } from 'react-i18next';
import BranchList from './c-pages/Branch';
import DepartmentList from './c-pages/Department';
import ProjectList from './c-pages/Project';

export const Organization = () => {
  const { t } = useTranslation();

  const {
    branches,
    setBranches,
    getBranches,
    loadingBranches,
    selectedBranchId,
    setSelectedBranchId,

    departments,
    setDepartments,
    getDepartments,
    loadingDepartments,
    selectedDepartmentId,
    setSelectedDepartmentId,

    projects,
    setProjects,
    getProjects,
    loadingProjects,
  } = useOrgStructure();

  const onResetDeleteBranch = () => {
    setSelectedBranchId(null);
    setSelectedDepartmentId(null);
  };

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_OrgStructure')} />
      <Main>
        <Row gutter={15}>
          <BranchList
            list={branches}
            setList={setBranches}
            getList={getBranches}
            loadingList={loadingBranches}
            selectedItem={selectedBranchId}
            setSelectedItem={setSelectedBranchId}
            onResetDeleteBranch={onResetDeleteBranch}
          />

          {selectedBranchId && (
            <DepartmentList
              list={departments}
              setList={setDepartments}
              getList={getDepartments}
              loadingList={loadingDepartments}
              selectedItem={selectedDepartmentId}
              setSelectedItem={setSelectedDepartmentId}
              selectedBranchId={selectedBranchId}
            />
          )}

          {selectedDepartmentId && (
            <ProjectList
              list={projects}
              setList={setProjects}
              getList={getProjects}
              loadingList={loadingProjects}
              selectedBranchId={selectedBranchId}
              selectedDepartmentId={selectedDepartmentId}
            />
          )}
        </Row>
      </Main>
    </>
  );
};

export default Organization;
