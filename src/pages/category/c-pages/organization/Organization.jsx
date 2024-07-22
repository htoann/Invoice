import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '@/container/styled';
import { Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BranchList from './c-pages/Branch';
import DepartmentList from './c-pages/Department';
import ProjectList from './c-pages/Project';
import useBranches from './hook/useBranches';
import useDepartments from './hook/useDepartments';
import useProjects from './hook/useProjects';

export const Organization = () => {
  const { t } = useTranslation();

  const { branches, setBranches, loadingBranches } = useBranches();
  const [selectedBranch, setSelectedBranch] = useState(null);

  const { selectedDepartment, departments, setDepartments, loadingDepartments, setSelectedDepartment } =
    useDepartments(selectedBranch);

  const { projects, setProjects, loadingProjects } = useProjects(selectedDepartment, selectedBranch);

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Common_OrgStructure')} />
      <Main>
        <Row gutter={15}>
          <BranchList
            list={branches}
            setList={setBranches}
            loadingList={loadingBranches}
            selectedItem={selectedBranch}
            setSelectedItem={setSelectedBranch}
          />

          {selectedBranch && (
            <DepartmentList
              list={departments}
              setList={setDepartments}
              loadingList={loadingDepartments}
              selectedItem={selectedDepartment}
              setSelectedItem={setSelectedDepartment}
            />
          )}

          {selectedDepartment && <ProjectList list={projects} setList={setProjects} loadingList={loadingProjects} />}
        </Row>
      </Main>
    </>
  );
};

export default Organization;
