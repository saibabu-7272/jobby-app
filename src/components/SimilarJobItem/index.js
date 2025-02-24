import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = similarJob
  return (
    <li className="similar-job-card">
      <div className="flex-row">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
      </div>
      <h2>Description</h2>
      <p>{jobDescription}</p>
      <div className="space-evenly">
        <MdLocationOn className="small-icon" />
        <p>{location}</p>
        <BsBriefcaseFill className="small-icon" />
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItem
