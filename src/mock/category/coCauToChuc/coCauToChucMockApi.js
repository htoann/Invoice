import { branches, departments, projects } from './coCauToChuc';

export const coCauToChucMockApi = (mock) => {
  // Mock GET request to fetch all branches
  mock.onGet('/branches').reply(200, { branches });

  // Mock POST request to add a new branch
  mock.onPost('/branches').reply((config) => {
    const { branch } = JSON.parse(config.data);
    const newBranch = { ...branch, id: String(branches.length + 1) };
    branches.push(newBranch);
    return [201, newBranch];
  });

  // Mock PUT request to update a branch
  mock.onPut(/\/branches\/(\d+)/).reply((config) => {
    const branchId = config.url.split('/')[2];
    const { branch } = JSON.parse(config.data);
    const index = branches.findIndex((b) => b.id === branchId);
    if (index !== -1) {
      branches[index] = { ...branches[index], ...branch };
      return [200, branches[index]];
    }
    return [404, { error: 'Branch not found' }];
  });

  // Mock DELETE request to delete a branch
  mock.onDelete(/\/branches\/(\d+)/).reply((config) => {
    const branchId = config.url.split('/')[2];
    const index = branches.findIndex((b) => b.id === branchId);
    if (index !== -1) {
      branches.splice(index, 1);
      // Also delete associated departments and projects
      departments
        .filter((dep) => dep.branch_id === branchId)
        .forEach((dep) => {
          departments.splice(departments.indexOf(dep), 1);
          projects
            .filter((proj) => proj.department_id === dep.id)
            .forEach((proj) => {
              projects.splice(projects.indexOf(proj), 1);
            });
        });
      return [204, {}];
    }
    return [404, { error: 'Branch not found' }];
  });

  // Mock GET request to fetch departments for a specific branch
  mock.onGet(/\/departments(?:\/(\d+))?/).reply((config) => {
    const branchId = config.url.split('/')[2];
    const branchDepartments = departments.filter((dep) => dep.branch_id === branchId);
    return [200, { departments: branchId ? branchDepartments : departments }];
  });

  // Mock GET request to fetch projects for a specific department
  mock.onGet(/\/projects\/([\d.]+)/).reply((config) => {
    const departmentId = config.url.split('/')[2];
    const departmentProjects = projects.filter((proj) => proj.department_id === departmentId);
    return [200, { projects: departmentProjects }];
  });

  // Mock POST request to add a new department
  mock.onPost('/departments').reply((config) => {
    const { department } = JSON.parse(config.data);
    const newDepartment = { ...department, id: String(departments.length + 1) };
    departments.push(newDepartment);
    return [201, newDepartment];
  });

  // Mock PUT request to update a department
  mock.onPut(/\/departments\/(\d+)/).reply((config) => {
    const departmentId = config.url.split('/')[2];
    const { department } = JSON.parse(config.data);
    const index = departments.findIndex((dep) => dep.id === departmentId);
    if (index !== -1) {
      departments[index] = { ...departments[index], ...department };
      return [200, departments[index]];
    }
    return [404, { error: 'Department not found' }];
  });

  // Mock DELETE request to delete a department
  mock.onDelete(/\/departments\/(\d+)/).reply((config) => {
    const departmentId = config.url.split('/')[2];
    const index = departments.findIndex((dep) => dep.id === departmentId);
    if (index !== -1) {
      departments.splice(index, 1);
      // Also delete associated projects
      projects
        .filter((proj) => proj.department_id === departmentId)
        .forEach((proj) => {
          projects.splice(projects.indexOf(proj), 1);
        });
      return [204, {}];
    }
    return [404, { error: 'Department not found' }];
  });

  // Mock POST request to add a new project
  mock.onPost('/projects').reply((config) => {
    const { project } = JSON.parse(config.data);
    const newProject = { ...project, id: `${projects.length + 1}.${Math.floor(Math.random() * 10) + 1}` };
    projects.push(newProject);
    return [201, newProject];
  });

  // Mock PUT request to update a project
  mock.onPut(/\/projects\/(\d+\.\d+)/).reply((config) => {
    const projectId = config.url.split('/')[2];
    const { project } = JSON.parse(config.data);
    const index = projects.findIndex((proj) => proj.id === projectId);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...project };
      return [200, projects[index]];
    }
    return [404, { error: 'Project not found' }];
  });

  // Mock DELETE request to delete a project
  mock.onDelete(/\/projects\/(\d+\.\d+)/).reply((config) => {
    const projectId = config.url.split('/')[2];
    const index = projects.findIndex((proj) => proj.id === projectId);
    if (index !== -1) {
      projects.splice(index, 1);
      return [204, {}];
    }
    return [404, { error: 'Project not found' }];
  });

  return mock;
};
