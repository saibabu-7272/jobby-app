import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import Home from './components/Home'

import Jobs from './components/Jobs'

import JobDetailedPage from './components/JobDetailedPage'

import ProtectedRouter from './components/ProtectedRouter'

import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRouter exact path="/" component={Home} />
    <ProtectedRouter
      exact
      path="/jobs"
      component={Jobs}
      salaryRangesList={salaryRangesList}
      employmentTypesList={employmentTypesList}
    />
    <ProtectedRouter exact path="/jobs/:id" component={JobDetailedPage} />

    <Route component={NotFound} />
  </Switch>
)

export default App
