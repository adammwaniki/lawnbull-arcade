import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapLocationDot, faPhone, faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-center flex-wrap space-x-6 md:flex-row text-center text-xs md:text-lg p-1 bg-gray-100 text-black w-full">
      <div>
        &copy; {currentYear} Lawnbull Limited. All rights reserved.
      </div>
      <div>
        <FontAwesomeIcon icon={faPhone} style={{color: "#00e09d",}} />
        Contact us: <a href="tel:+254722815283" className="hover:underline hover:text-blue-600 transition-colors duration-300">+254-722-815-283</a> | <FontAwesomeIcon icon={faEnvelopeOpen} style={{color: "#74C0FC",}} />
        <a href="mailto:kazibest@yahoo.com" className="hover:underline hover:text-blue-600 transition-colors duration-300">kazibest@yahoo.com</a>
      </div>
      <div>
        <a
          href="https://maps.app.goo.gl/oiYvexC32eqxsnK29"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-blue-600 transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faMapLocationDot} style={{color: "#db0000",}} />
          Location: Kenya, Nyeri, Kazi Building, along Kimathi Street
        </a>
      </div>
    </footer>
  );
}
