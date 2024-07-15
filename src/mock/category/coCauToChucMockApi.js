import axiosInstance from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { departments, subTeams, teams } from './coCauToChuc';

const axios = axiosInstance.create();

const mock = new MockAdapter(axios, { delayResponse: 500 });

// #region Departments
mock.onGet('/departments').reply(200, {
  departments,
});

// Get all teams for a specific department
mock.onGet(/\/departments\/(\d+)\/teams/).reply((config) => {
  const departmentId = config.url.split('/')[2];
  const departmentTeams = teams.filter((team) => team.department_id === departmentId);
  return [200, { teams: departmentTeams }];
});

// Add a new department
mock.onPost('/departments').reply((config) => {
  const { department } = JSON.parse(config.data);
  const newDepartment = { ...department, id: (departments.length + 1).toString() };
  departments.push(newDepartment);
  return [201, newDepartment];
});

// Update a department
mock.onPut(/\/departments\/(\d+)/).reply((config) => {
  const departmentId = config.url.split('/')[2];
  const { department } = JSON.parse(config.data);
  const index = departments.findIndex((dep) => dep.id === departmentId);
  if (index > -1) {
    departments[index] = { ...departments[index], ...department };
    return [200, departments[index]];
  }
  return [404, { error: 'Department not found' }];
});

// Delete a department
mock.onDelete(/\/departments\/(\d+)/).reply((config) => {
  const departmentId = config.url.split('/')[2];
  const index = departments.findIndex((dep) => dep.id === departmentId);
  if (index > -1) {
    departments.splice(index, 1);
    return [204, {}];
  }
  return [404, { error: 'Department not found' }];
});
// #endregion

// Get all sub-teams for a specific team
mock.onGet(/\/teams\/(\d+\.\d+)\/sub-teams/).reply((config) => {
  const teamId = config.url.split('/')[2];
  const teamSubTeams = subTeams.filter((subTeam) => subTeam.team_id === teamId);
  return [200, { members: teamSubTeams }];
});

// Get a specific department by ID
mock.onGet(/\/departments\/(\d+)/).reply((config) => {
  const departmentId = config.url.split('/')[2];
  const department = departments.find((dep) => dep.id === departmentId);
  return [200, { department: department || null }];
});

// Get a specific team by ID
mock.onGet(/\/teams\/(\d+\.\d+)/).reply((config) => {
  const teamId = config.url.split('/')[2];
  const team = teams.find((t) => t.id === teamId);
  return [200, { team: team || null }];
});

// Get a specific sub-team by ID
mock.onGet(/\/sub-teams\/(\d+\.\d+\.\d+)/).reply((config) => {
  const subTeamId = config.url.split('/')[2];
  const subTeam = subTeams.find((st) => st.id === subTeamId);
  return [200, { subTeam: subTeam || null }];
});

export default axios;
