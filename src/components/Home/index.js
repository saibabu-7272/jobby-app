import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="jobby-home-container">
      <div className="jobby-home-content-container">
        <h1 className="jobby-home-heading">Find The Job That Fits Your Life</h1>
        <p className="jobby-home-description">
          Millions of people are searching for jobs components you implement
          should go in the src components directory. Do not change the component
          folder names as those are the files being imported into the tests. Do
          not remove the pre-filled code Want to quickly review some of the
          concepts.
        </p>
        <Link to="/jobs">
          <button className="jobby-find-jobs-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
