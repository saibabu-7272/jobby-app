import './index.css'

const NoJobsView = props => (
  <div className="notFound-page">
    <img
      className="failure-image"
      src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      alt="no jobs"
    />
    <h1>No Jobs Found</h1>
    <p>We could not find any jobs. Try other filters</p>
  </div>
)

export default NoJobsView
