import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

export const useGetOrgStructure = () => {
  const { getBranches, selectedBranchId, getDepartments, selectedDepartmentId, getProjects } = useAppState();

  useEffect(() => {
    getBranches();
  }, []);

  // useEffect(() => {
  //   selectedBranchId && getDepartments();
  // }, [selectedBranchId]);

  useEffect(() => {
    getDepartments();
  }, [selectedBranchId]);

  useEffect(() => {
    selectedDepartmentId && getProjects();
  }, [selectedBranchId, selectedDepartmentId]);
};