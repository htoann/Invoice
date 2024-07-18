export const branches = [
  { id: '1', name: 'Headquarters' },
  { id: '2', name: 'Regional Office East' },
  { id: '3', name: 'Regional Office West' },
  { id: '4', name: 'Regional Office North' },
  { id: '5', name: 'Regional Office South' },
];

export const departments = [
  { id: '1', name: 'Engineering', branch_id: '1' },
  { id: '2', name: 'Human Resources', branch_id: '1' },
  { id: '3', name: 'Sales', branch_id: '2' },
  { id: '4', name: 'Marketing', branch_id: '3' },
  { id: '5', name: 'Finance', branch_id: '2' },
  { id: '6', name: 'Customer Support', branch_id: '4' },
  { id: '7', name: 'IT', branch_id: '5' },
];

export const projects = [
  {
    id: '1.1',
    name: 'Software Development',
    department_id: '1',
  },
  {
    id: '1.2',
    name: 'Infrastructure Upgrade',
    department_id: '1',
  },
  {
    id: '2.1',
    name: 'Employee Onboarding System',
    department_id: '2',
  },
  {
    id: '3.1',
    name: 'Sales Expansion',
    department_id: '3',
  },
  {
    id: '4.1',
    name: 'Digital Marketing Campaign',
    department_id: '4',
  },
  {
    id: '5.1',
    name: 'Financial Forecasting',
    department_id: '5',
  },
  {
    id: '6.1',
    name: 'Customer Feedback Portal',
    department_id: '6',
  },
  {
    id: '7.1',
    name: 'Network Security Upgrade',
    department_id: '7',
  },
  {
    id: '7.2',
    name: 'Cloud Migration',
    department_id: '7',
  },
];
