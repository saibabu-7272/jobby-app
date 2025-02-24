import Loader from 'react-loader-spinner'

import './index.css'

const LoadingView = () => (
  <div className="loader" data-testid="loader">
    <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
  </div>
)

export default LoadingView
