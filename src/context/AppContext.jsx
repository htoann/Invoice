import { API_BRANCHES, API_DEPARTMENTS, API_PROJECTS, dataService } from '@/service';
import { notification } from 'antd';
import Cookies from 'js-cookie';
import { createContext, useCallback, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [themeState, setThemeState] = useState({
    rtlData: Cookies.get('rtl') || false,
    topMenu: Cookies.get('topMenu') !== undefined ? Cookies.get('topMenu') === 'true' : true,
    layoutMode: Cookies.get('layoutMode') || 'lightMode',
  });

  const changeLayoutMode = useCallback((value) => {
    Cookies.set('layoutMode', value);
    setThemeState((prevState) => ({
      ...prevState,
      layoutMode: value,
    }));
  }, []);

  const changeDirectionMode = useCallback((value) => {
    Cookies.set('rtl', value);
    setThemeState((prevState) => ({
      ...prevState,
      rtl: value,
    }));
  }, []);

  const changeMenuMode = useCallback((value) => {
    Cookies.set('topMenu', value);
    setThemeState((prevState) => ({
      ...prevState,
      topMenu: value,
    }));
  }, []);

  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState('');

  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState('');

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const [selectedAccountId, setSelectedAccountId] = useState('');

  const getBranches = async () => {
    setLoadingBranches(true);
    try {
      const response = await dataService.get(API_BRANCHES);
      setBranches(response.data);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách chi nhánh. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingBranches(false);
    }
  };

  const getDepartments = async () => {
    setDepartments([]);
    // setSelectedDepartmentId(''); selectedDepartment was reset incorrectly

    if (!selectedBranchId) {
      return;
    }

    setLoadingDepartments(true);

    try {
      const response = await dataService.get(API_DEPARTMENTS, { branch: selectedBranchId });
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách phòng ban. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingDepartments(false);
    }
  };

  const getProjects = async () => {
    setProjects([]);

    if (!selectedBranchId && !selectedDepartmentId) {
      return;
    }

    setLoadingProjects(true);

    try {
      const response = await dataService.get(API_PROJECTS, {
        branch: selectedBranchId,
        department: selectedDepartmentId,
      });
      setProjects(response.data);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải danh sách dự án. Vui lòng thử lại sau.',
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  const resetOrgStructure = () => {
    setBranches([]);
    setLoadingBranches(false);
    setSelectedBranchId('');

    setDepartments([]);
    setLoadingDepartments(false);
    setSelectedDepartmentId('');

    setProjects([]);
    setLoadingProjects(false);
    setSelectedProjectId('');

    setSelectedAccountId('');
  };

  return (
    <AppContext.Provider
      value={{
        layoutMode: themeState.layoutMode,
        rtl: themeState.rtlData,
        topMenu: themeState.topMenu,
        changeLayoutMode,
        changeDirectionMode,
        changeMenuMode,

        branches,
        setBranches,
        loadingBranches,
        setLoadingBranches,
        getBranches,
        selectedBranchId,
        setSelectedBranchId,

        departments,
        setDepartments,
        loadingDepartments,
        setLoadingDepartments,
        getDepartments,
        selectedDepartmentId,
        setSelectedDepartmentId,

        projects,
        setProjects,
        loadingProjects,
        setLoadingProjects,
        getProjects,
        selectedProjectId,
        setSelectedProjectId,

        selectedAccountId,
        setSelectedAccountId,

        resetOrgStructure,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
