import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot, faPhone, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export default function Footer({ darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`fixed bottom-0 left-0 right-0 flex justify-center flex-wrap space-x-6 md:flex-row text-center text-xs md:text-lg p-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} w-full z-50`}>
      <div>
        &copy; {currentYear} Lawnbull Limited. All rights reserved.
      </div>
      <div>
        Contact us: 
        <FontAwesomeIcon icon={faPhone} style={{color: darkMode ? "#00ff9d" : "#00e09d",}} />
        <a href="tel:+254789370012" className={`hover:underline hover:text-blue-${darkMode ? '400' : '600'} transition-colors duration-300`}>+254-789-370-012</a> | <FontAwesomeIcon icon={faEnvelopeOpen} style={{color: darkMode ? "#94E0FC" : "#74C0FC",}} />
        <a href="mailto:lawnbullltd@gmail.com" className={`hover:underline hover:text-blue-${darkMode ? '400' : '600'} transition-colors duration-300`}>lawnbullltd@gmail.com</a>
      </div>
      <div>
        <a
          href="https://maps.app.goo.gl/oiYvexC32eqxsnK29"
          target="_blank"
          rel="noopener noreferrer"
          className={`hover:underline hover:text-blue-${darkMode ? '400' : '600'} transition-colors duration-300`}
        >
          <FontAwesomeIcon icon={faMapLocationDot} style={{color: darkMode ? "#ff0000" : "#db0000",}} />
          Location: Kenya, Nyeri, Lawnbull Arcade, along Kimathi Street
        </a>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  darkMode: PropTypes.bool,
};
