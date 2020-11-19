import React from "react"
import '../style/timer.css'
import "bootstrap/dist/css/bootstrap.css"
import "@fortawesome/free-solid-svg-icons"
import "@fortawesome/react-fontawesome"

export default () => (
  <main>
    <h1>Personalized Music Timer</h1>

    <section className={"ttl-btn"}>
      <br/>
      <form>
        <div className="form-group">
          <form className="row">
            <div className="col-5">
              <label className="fn">
                Title
              </label>
              <input type="text"
                     className="fn form-control"
                     placeholder="Enter Timer Title">
              </input>
            </div>
          </form>
        </div>
        <div className="form-group">
          <form className="row">
            <div className="col-5">
              <label className="fn">
                Work Time
              </label>
              <input type="text"
                     className="fn form-control"
                     placeholder="Enter Work Time">
              </input>
            </div>
          </form>
        </div>
        <div className="form-group">
          <form className="row">
            <div className="col-5">
              <label className="fn">
                Rest Time
              </label>
              <input type="text"
                     className="fn form-control"
                     placeholder="Enter Rest Time">
              </input>
            </div>
          </form>
        </div>
        <div className="form-group">
          <form className="row">
            <div className="col-5">
              <label className="fn">
                Sound for Work Period
              </label>
              <select id="options" name="sound_work_period">
                <option value="None">None</option>
                <option value="A Playlist">A Playlist</option>
                <option value="Our Recommendation">Our Recommendation</option>
              </select>
            </div>
          </form>
        </div>
      </form>


    </section>


  </main>
)
