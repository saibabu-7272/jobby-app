import {Component} from 'react'

import Cookies from 'js-cookie'

import {FiExternalLink} from 'react-icons/fi'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'

import FailureView from '../FailureView'

import LoadingView from '../LoadingView'

import './index.css'

const viewsStatus = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobDetailedPage extends Component {
  state = {
    job: {},
    lifeAtCompany: {},
    similarJobs: [],
    stateLifeAtCompany: {},
    skills: [],
    view: viewsStatus.loading,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    this.setState({view: viewsStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const url = `https://apis.ccbp.in/jobs/${id}`
      const response = await fetch(url, options)
      const data = await response.json()
      // console.log(data)
      const each = data.job_details
      const updatedData = {
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        skills: each.skills,
        lifeAtCompany: each.life_at_company,
      }
      // console.log(updatedData)

      /// ///
      const similarJobs = data.similar_jobs
      const updatedSimilarJobs = similarJobs.map(item => ({
        id: item.id,
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      /// //

      const lifeAtCompanyData = {
        description: updatedData.lifeAtCompany.description,
        imageUrl: updatedData.lifeAtCompany.image_url,
      }
      // console.log(lifeAtCompanyData)
      ///

      const updatedSkills = updatedData.skills.map(item => ({
        skillName: item.name,
        skillImage: item.image_url,
      }))
      // console.log(updatedSkills)

      if (response.ok) {
        this.setState({
          job: updatedData,
          similarJobs: updatedSimilarJobs,
          skills: updatedSkills,
          lifeAtCompany: lifeAtCompanyData,
          view: viewsStatus.success,
        })
      }
    } catch (e) {
      this.setState({view: viewsStatus.failed})
    }
  }

  successView = () => {
    const {job, skills, lifeAtCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = job
    return (
      <div className="JobDetailedPage-bg">
        <div className="job-detailed-card">
          <div className="flex-row">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1>{title}</h1>
              <p>{rating}</p>
            </div>
          </div>
          <div className="space-betweeen">
            <div className="flex-row">
              <MdLocationOn className="small-icon" />
              <p>{location}</p>
              <BsBriefcaseFill className="small-icon" />
              <p>{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <div className="space-betweeen">
            <h2>Description</h2>
            <a className="siteLink" href={companyWebsiteUrl}>
              Visit <FiExternalLink />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h2>Skills</h2>
          <ul className="list-of-skills">
            {skills.map(skill => (
              <li className="flex-row">
                <img
                  className="skill-image"
                  src={skill.skillImage}
                  alt="skill"
                />
                <p>{skill.skillName}</p>
              </li>
            ))}
          </ul>
          <h2>Life at company</h2>
          <div className="flex-row">
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h2>Similar Jobs</h2>
        <ul className="list-of-skills">
          {similarJobs.map(similarJob => (
            <SimilarJobItem similarJob={similarJob} />
          ))}
        </ul>
      </div>
    )
  }

  renderAllViews = () => {
    const {view} = this.state
    switch (view) {
      case viewsStatus.loading:
        return <LoadingView />
      case viewsStatus.success:
        return <>{this.successView()}</>
      case viewsStatus.failed:
        return <FailureView getData={this.getData} />
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderAllViews()}
      </div>
    )
  }
}

export default JobDetailedPage
