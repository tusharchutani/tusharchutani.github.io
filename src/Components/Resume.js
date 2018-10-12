import React, { Component } from 'react';

class Resume extends Component {
  render() {

    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function (education) {
        return <div key={education.school}><h3>{education.school}</h3>
          <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
          <p>{education.description}</p></div>
      })
      var work = this.props.data.work.map(function (work) {
        return <div key={work.company}><h3>{work.company}</h3>
          <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
          <p>{work.description}</p>
        </div>
      });

      var projects = this.props.data.projects.map(function (project) {
        return <div key={project.projectName}><h3>{project.projectName}</h3>
          <p className="info">{project.title}
            <span>Source Code <span>&nbsp;</span><a href={project.link}><i className={project.className}> </i></a></span> 
          </p>
          <p>
            {project.description}
            <br/>
            <p className="info">{project.skills}</p>
          </p>
        </div>
      });

      var skills = this.props.data.skills.map(function (skills) {
        var className = 'bar-expand ' + skills.name.toLowerCase();
        return <li key={skills.name}><span style={{ width: skills.level }} className={className}></span><em>{skills.name}</em></li>
      })
    }

    return (
      <section id="resume">

        <div className="row education">
          <div className="three columns header-col">
            <h1><span>Education</span></h1>
          </div>

          <div className="nine columns main-col">
            <div className="row item">
              <div className="twelve columns">
                {education}
              </div>
            </div>
          </div>
        </div>


        <div className="row work" id="works">
          <div className="three columns header-col">
            <h1><span>Work</span></h1>
          </div>
          <div className="nine columns main-col">
            {work}
          </div>
        </div>

        <div className="row projects" id="projects">
          <div className="three columns header-col">
            <h1><span>Projects</span></h1>
          </div>
          <div className="nine columns main-col">
            {projects}
          </div>
        </div>



        <div className="row skill">
          <div className="three columns header-col">
            <h1><span>Skills</span></h1>
          </div>

          <div className="nine columns main-col">

            <p>{skillmessage}
            </p>

            <div className="bars">
              <ul className="skills">
                {skills}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
