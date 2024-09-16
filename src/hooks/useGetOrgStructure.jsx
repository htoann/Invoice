import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

export const useGetOrgStructure = (stateToTrack, needCheckCondition, condition) => {
  const { getBranches, selectedBranchId, getDepartments, selectedDepartmentId, getProjects, resetOrgStructure } =
    useAppState();

  const stateCheck = stateToTrack?.visible || stateToTrack?.editVisible || false;

  useEffect(() => {
    if (needCheckCondition) {
      condition && getBranches();
    } else {
      getBranches();
    }
  }, [stateCheck]);

  useEffect(() => {
    if (needCheckCondition) {
      condition && selectedBranchId && getDepartments();
    } else {
      selectedBranchId && getDepartments();
    }
  }, [stateCheck, selectedBranchId]);

  useEffect(() => {
    if (needCheckCondition) {
      condition && selectedBranchId && selectedDepartmentId && getProjects();
    } else {
      selectedBranchId && selectedDepartmentId && getProjects();
    }
  }, [stateCheck, selectedBranchId, selectedDepartmentId]);

  useEffect(() => {
    return () => {
      resetOrgStructure();
    };
  }, [stateCheck]);
};
