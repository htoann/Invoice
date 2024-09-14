import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

export const useGetOrgStructure = (stateToTrack, isCondition, condition) => {
  const { getBranches, selectedBranchId, getDepartments, selectedDepartmentId, getProjects, resetOrgStructure } =
    useAppState();

  const isVisible = stateToTrack?.visible || false;
  const isEditVisible = stateToTrack?.editVisible || false;

  useEffect(() => {
    if (isCondition) {
      condition && getBranches();
    } else {
      getBranches();
    }
  }, [isVisible, isEditVisible]);

  useEffect(() => {
    if (isCondition) {
      condition && selectedBranchId && getDepartments();
    } else {
      selectedBranchId && getDepartments();
    }
  }, [selectedBranchId]);

  useEffect(() => {
    if (isCondition) {
      condition && selectedBranchId && selectedDepartmentId && getProjects();
    } else {
      selectedBranchId && selectedDepartmentId && getProjects();
    }
  }, [selectedBranchId, selectedDepartmentId]);

  useEffect(() => {
    return () => {
      resetOrgStructure();
    };
  }, [isVisible, isEditVisible]);
};
