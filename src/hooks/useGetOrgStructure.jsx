import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

export const useGetOrgStructure = (stateToTrack, needCheckCondition, condition) => {
  const { getBranches, selectedBranchId, getDepartments, selectedDepartmentId, getProjects, resetOrgStructure } =
    useAppState();

  const isVisible = stateToTrack?.visible || false;
  const isEditVisible = stateToTrack?.editVisible || false;

  const checkCondition = (fn) => {
    if (needCheckCondition) {
      condition && fn;
    } else {
      fn;
    }
  };

  useEffect(() => {
    checkCondition(getBranches());
  }, [isVisible, isEditVisible]);

  useEffect(() => {
    checkCondition(selectedBranchId && getDepartments());
  }, [selectedBranchId]);

  useEffect(() => {
    checkCondition(selectedBranchId && selectedDepartmentId && getProjects());
  }, [selectedBranchId, selectedDepartmentId]);

  useEffect(() => {
    if (needCheckCondition) {
      if (condition) {
        return () => {
          resetOrgStructure();
        };
      }
    } else {
      return () => {
        resetOrgStructure();
      };
    }
  }, [isVisible, isEditVisible]);
};
