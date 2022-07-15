import myPicture from '../../../images/myPicture.jpeg';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

function AboutMe() {




  return (
    <div className="about-me">
      <div className="about-me-card">
        <p className="name">Jose Luis Martinez Saldaña</p>
        <img src={myPicture} alt={myPicture} />
        <div className='bio'>
          <p>Welcome to my website.  If you have any questions   <a className="bold" href="mailto:jmartinezsal326@gmail.com" target="_blank" rel="noreferrer">email me</a>.
            Or if you would like to get to know more of my progress as a Fullstack engineer, follow my links bellow.</p>
        </div>
        <div className="link-btns">
          <a href="https://www.linkedin.com/in/jose-martinez-b7a1b3b8/" alt="linked-in" rel="noreferrer" target="_blank" >
            <BsLinkedin /> Linked In
          </a>
          <a href="https://github.com/jmartinezsal" target="_blank" alt="github" rel="noreferrer">
            <BsGithub /> Github
          </a>
        </div>

      </div>
    </div>
  )
}


export default AboutMe;
