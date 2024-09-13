import { useAppState } from 'context/AppContext';
import { useEffect } from 'react';

export const useGetOrgStructure = (stateToTrack) => {
  const { getBranches, selectedBranchId, getDepartments, selectedDepartmentId, getProjects, resetOrgStructure } =
    useAppState();

  useEffect(() => {
    getBranches();
  }, [stateToTrack?.visible, stateToTrack?.editVisible]);

  useEffect(() => {
    selectedBranchId && getDepartments();
  }, [selectedBranchId]);

  useEffect(() => {
    selectedBranchId && selectedDepartmentId && getProjects();
  }, [selectedBranchId, selectedDepartmentId]);

  useEffect(() => {
    return () => {
      resetOrgStructure();
    };
  }, [stateToTrack?.visible, stateToTrack?.editVisible]);
};
