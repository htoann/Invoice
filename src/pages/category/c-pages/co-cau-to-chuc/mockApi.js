import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import data from './department.json';

const teams = data.departments.flatMap((department) => department.teams);

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet('/departments').reply(200, {
  departments: data.departments,
});

// Get Members by Team ID
mock.onGet(/\/teams\/\d+\.\d+\/members/).reply((config) => {
  const teamId = config.url.split('/')[2];
  const teamMembers = teams.find((team) => team.id === teamId);

  console.log(teamId);
  console.log(teamMembers);

  return [200, { members: teamMembers ? teamMembers.subTeams : [] }];
});

// Get Teams by Department ID
mock.onGet(/\/departments\/\d+\/teams/).reply((config) => {
  const departmentId = config.url.split('/')[2];
  const department = data.departments.find((dep) => dep.id === departmentId);
  return [200, { teams: department ? department.teams : [] }];
});

export default axios;
