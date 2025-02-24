import {Link} from 'react-router-dom'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = job
  return (
    <li className="jobby-jobCard">
      <Link className="link" to={`jobs/${id}`}>
        <div className="job-top-container">
          <img
            className="company-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
        </div>
        <div className="job-midle-container flex-container">
          <div className="flex-container">
            <MdLocationOn className="small-icon" />
            <p>{location}</p>
            <BsBriefcaseFill className="small-icon" />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
