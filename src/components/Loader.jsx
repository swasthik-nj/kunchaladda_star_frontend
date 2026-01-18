import '../styles/Loader.css'

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-circle"></div>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  )
}

export default Loader
