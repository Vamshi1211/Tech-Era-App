import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CoursesListItems from '../CoursesListItems'
import './index.css'

const apiStatusValue = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiStatusValue.initial, coursesList: []}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusValue.inProgress})

    const url = 'https://apis.ccbp.in/te/courses'

    const response = await fetch(url)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusValue.success,
      })
    } else {
      this.setState({apiStatus: apiStatusValue.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderTechView = () => {
    const {coursesList} = this.state

    return (
      <div className="courses-container">
        <h1 className="main-heading">Courses</h1>
        <ul className="courses-list-container">
          {coursesList.map(eachItem => (
            <CoursesListItems key={eachItem.id} eachCourse={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  retry = () => {
    this.getCoursesList()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Ooops! Something Went Wrong</h1>
      <p className="failure-des">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusValue.inProgress:
        return this.renderLoadingView()
      case apiStatusValue.success:
        return this.renderTechView()
      case apiStatusValue.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        {this.renderViews()}
      </div>
    )
  }
}

export default Home
