import { useState } from 'react';
import { useGetBranches } from './useGetBranches';
import { useGetDepartments } from './useGetDepartments';
import { useGetProjects } from './useGetProjects';

export const useOrgStructure = () => {
  const { branches, setBranches, loadingBranches, getBranches } = useGetBranches();
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  const {
    selectedDepartmentId,
    departments,
    setDepartments,
    getDepartments,
    loadingDepartments,
    setSelectedDepartmentId,
  } = useGetDepartments(selectedBranchId);

  const { projects, setProjects, getProjects, loadingProjects } = useGetProjects(
    selectedBranchId,
    selectedDepartmentId,
  );

  return {
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
  };
};
