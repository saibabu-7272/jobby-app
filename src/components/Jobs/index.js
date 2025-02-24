import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import JobCard from '../JobCard'

import Filter from '../Filter'

import UserProfile from '../UserProfile'

import FailureView from '../FailureView'

import LoadingView from '../LoadingView'

import NoJobsView from '../NoJobsView'

import './index.css'

const viewsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class Jobs extends Component {
  state = {
    listOfJobs: [],
    searchText: '',
    employmentTypes: [],
    minimumPackage: '',
    view: viewsStatus.loading,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({view: viewsStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const {employmentTypes, minimumPackage, searchText} = this.state
    try {
      const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes.join()}&minimum_package=${minimumPackage}&search=${searchText}`
      const response = await fetch(url, options)
      const data = await response.json()
      // console.log(data)

      const updatedJobsList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        id: each.id,
        title: each.title,
      }))
      // console.log(updatedJobsList)
      if (response.ok) {
        this.setState({listOfJobs: updatedJobsList, view: viewsStatus.success})
      }
    } catch (e) {
      this.setState({view: viewsStatus.failed})
    }
  }

  onSearch = event => {
    const {searchText} = this.state
    // if (searchText === '') {
    //   this.getData()
    // }
    this.setState({searchText: event.target.value})
  }

  filterList = () => {
    const {listOfJobs, searchText} = this.state
    const searchedList = listOfJobs.filter(eachJob =>
      eachJob.title.toLowerCase().includes(searchText),
    )

    return searchedList
  }

  updateSalaryRange = val => {
    this.setState({minimumPackage: val}, this.getData)
  }

  updateEmployeType = val => {
    const {employmentTypes} = this.state

    if (employmentTypes.includes(val)) {
      const removedList = employmentTypes.filter(each => each !== val)
      this.setState({employmentTypes: removedList}, this.getData)
    } else {
      this.setState(
        prevState => ({
          employmentTypes: [...prevState.employmentTypes, val],
        }),
        this.getData,
      )
    }
  }

  renderAllViews = () => {
    const {view, listOfJobs} = this.state
    // const finalList = this.filterList()
    switch (view) {
      case viewsStatus.loading:
        return <LoadingView />
      case viewsStatus.success:
        if (listOfJobs.length === 0) {
          return <NoJobsView />
        }
        return (
          <ul className="ul-list">
            {listOfJobs.map(each => (
              <JobCard job={each} key={each.id} />
            ))}
          </ul>
        )

      case viewsStatus.failed:
        return <FailureView getData={this.getData} />
      default:
        return null
    }
  }

  search = () => {
    this.getData()
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobby-jobs-route">
          <div className="filters-and-jobs-container">
            <div>
              <UserProfile />
              <Filter
                updateEmployeType={this.updateEmployeType}
                updateSalaryRange={this.updateSalaryRange}
                className="filter-container"
              />
            </div>
            <div className="container">
              <input
                onChange={this.onSearch}
                className="jobs-search-input"
                type="search"
                placeholder="Search"
              />
              <button
                onClick={this.search}
                className="search-btn"
                type="button"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
              {this.renderAllViews()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
