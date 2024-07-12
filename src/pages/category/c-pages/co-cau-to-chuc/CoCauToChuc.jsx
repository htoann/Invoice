import { PageHeader } from '@/components/page-headers/page-headers';
import { Main } from '@/container/styled';
import { Row } from 'antd';
import { useEffect, useState } from 'react';
import DepartmentList from './c-pages/Department';
import MemberList from './c-pages/Member';
import TeamList from './c-pages/Team';
import axios from './mockApi';

export const CoCauToChuc = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [members, setMembers] = useState([]);

  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);

  useEffect(() => {
    setLoadingDepartments(true);

    axios
      .get('/departments')
      .then((response) => {
        setDepartments(response.data.departments);
        setLoadingDepartments(false);
      })
      .catch(() => {
        setLoadingDepartments(false);
      });
  }, []);

  useEffect(() => {
    setTeams([]);
    setSelectedTeam(null);

    if (!selectedDepartment) {
      return;
    }

    setLoadingTeams(true);
    axios
      .get(`/departments/${selectedDepartment}/teams`)
      .then((response) => {
        setTeams(response.data.teams);
        setLoadingTeams(false);
      })
      .catch(() => {
        setLoadingTeams(false);
      });
  }, [selectedDepartment]);

  useEffect(() => {
    setMembers([]);

    if (!selectedTeam) {
      return;
    }

    setLoadingMembers(true);
    axios
      .get(`/teams/${selectedTeam}/sub-teams`)
      .then((response) => {
        setMembers(response.data.members);
        setLoadingMembers(false);
      })
      .catch(() => {
        setLoadingMembers(false);
      });
  }, [selectedTeam, selectedDepartment]);

  return (
    <>
      <PageHeader className="ninjadash-page-header-main" title="Cơ cấu tổ chức" />
      <Main>
        <Row gutter={15}>
          <DepartmentList
            departments={departments}
            loadingDepartments={loadingDepartments}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />
          {selectedDepartment && (
            <TeamList
              teams={teams}
              loadingTeams={loadingTeams}
              selectedTeam={selectedTeam}
              setSelectedTeam={setSelectedTeam}
            />
          )}
          {selectedTeam && <MemberList members={members} loadingMembers={loadingMembers} />}
        </Row>
      </Main>
    </>
  );
};

export default CoCauToChuc;
