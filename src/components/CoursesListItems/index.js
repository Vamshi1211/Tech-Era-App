import {Link} from 'react-router-dom'
import './index.css'

const CoursesListItems = props => {
  const {eachCourse} = props
  const {id, name, logoUrl} = eachCourse

  return (
    <li className="course-list-item--container">
      <Link to={`/courses/${id}`} className="list-button">
        <img src={logoUrl} alt={name} className="image" />
        <p className="course-name-heading">{name}</p>
      </Link>
    </li>
  )
}

export default CoursesListItems
