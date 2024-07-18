import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Project = lazy(() => import('../../container/project/Project'));
const ProjectDetails = lazy(() => import('../../container/project/ProjectDetails'));
const ProjectCreate = lazy(() => import('../../container/project/ProjectCreate'));
const NotFound = lazy(() => import('../../container/pages/404'));

function ProjectRoutes() {
  return (
    <Routes>
      <Route path="projectDetails/:id/*" element={<ProjectDetails />} />
      <Route path="view/*" element={<Project />} />
      <Route path="create/*" element={<ProjectCreate />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default ProjectRoutes;
