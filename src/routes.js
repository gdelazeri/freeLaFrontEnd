import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Clients = Loadable({
  loader: () => import('./views/Clients/Clients'),
  loading: Loading,
});

const Projects = Loadable({
  loader: () => import('./views/Projects/Projects'),
  loading: Loading,
});

const ProjectAdd = Loadable({
  loader: () => import('./views/Projects/ProjectAdd'),
  loading: Loading,
});

const Project = Loadable({
  loader: () => import('./views/Projects/Project'),
  loading: Loading,
});

const ProjectItem = Loadable({
  loader: () => import('./views/Projects/ProjectItem'),
  loading: Loading,
});

const ProjectAddItens = Loadable({
  loader: () => import('./views/Projects/ProjectAddItens'),
  loading: Loading,
});

const ProjectAddItem = Loadable({
  loader: () => import('./views/Projects/ProjectAddItem'),
  loading: Loading,
});

const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/clients', exact: true,  name: 'Clients', component: Clients },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/projectAdd', name: 'Project Add', component: ProjectAdd },
  { path: '/project', name: 'Project', component: Project },
  { path: '/projectItem', name: 'Project Item', component: ProjectItem },
  { path: '/projectAddItens', name: 'Project Add Itens', component: ProjectAddItens },
  { path: '/projectAddItem', name: 'Project Add Item', component: ProjectAddItem },
  
];

export default routes;
