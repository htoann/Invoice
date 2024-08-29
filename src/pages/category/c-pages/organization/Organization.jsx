import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '@/container/styled';
import { Row } from 'antd';
import useBranches from 'hooks/useBranches';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BranchList from './c-pages/Branch';
import DepartmentList from './c-pages/Department';
import ProjectList from './c-pages/Project';
import useDepartments from './hook/useDepartments';
import useProjects from './hook/useProjects';

export const Organization = () => {
  const { t } = useTranslation();

  const { branches, setBranches, loadingBranches, getBranches } = useBranches();
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  const {
    selectedDepartmentId,
    departments,
    setDepartments,
    getDepartments,
    loadingDepartments,
    setSelectedDepartmentId,
  } = useDepartments(selectedBranchId);

  const { projects, setProjects, getProjects, loadingProjects } = useProjects(selectedBranchId, selectedDepartmentId);

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
