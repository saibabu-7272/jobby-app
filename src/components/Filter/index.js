import './index.css'

import FilterItem from '../FilterItem'

import contextJobby from '../../context/contextJobby'

const Filter = props => (
  <contextJobby.Consumer>
    {value => {
      const {salaryRangesList, employmentTypesList} = value
      const {updateSalaryRange, updateEmployeType} = props

      const onSelectSalarayRange = event => {
        if (event.target.checked) {
          updateSalaryRange(event.target.value)
        } else {
          updateSalaryRange('')
        }
      }

      const onSelectEmployeType = event => {
        updateEmployeType(event.target.value)
      }

      // console.log(salaryRangesList)
      return (
        <div>
          <h2>Type of Employment</h2>
          <ul className="list">
            {employmentTypesList.map(each => (
              <FilterItem key={each.employmentTypeId}>
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  value={each.employmentTypeId}
                  onClick={onSelectEmployeType}
                />
                <label htmlFor={each.employmentTypeId}>{each.label}</label>
              </FilterItem>
            ))}
          </ul>
          <h2>Salary Range</h2>
          <ul className="list">
            {salaryRangesList.map(each => (
              <FilterItem key={each.salaryRangeId}>
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  name="salaryRange"
                  onChange={onSelectSalarayRange}
                  value={each.salaryRangeId}
                />
                <label htmlFor={each.salaryRangeId}>{each.label}</label>
              </FilterItem>
            ))}
          </ul>
        </div>
      )
    }}
  </contextJobby.Consumer>
)
export default Filter
