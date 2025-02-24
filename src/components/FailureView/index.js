import './index.css'

const FailureView = props => {
  const {getData} = props
  const onRetry = () => {
    getData()
  }
  return (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={onRetry} type="button">
        Retry
      </button>
    </div>
  )
}

export default FailureView
