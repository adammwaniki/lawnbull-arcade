import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-all duration-1000 ease-out transform ${isVisible ? '-translate-x-0' : '-translate-x-[90vw]'} flex lg:h-fit pl-2 pt-2 pb-2 text-lg md:text-[3.5vh] lg:leading-tight font-spicy-rice text-white text-center`}>
      <aside>
        <div className="flex  flex-grow">
          <nav>
            <ul className="space-y-2">
              {['Home', 'About', 'Marketing', 'Login'].map((item, index) => (
                <li
                  key={item}
                  className={`bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-80 rounded-full transition-all duration-500 ease-out transform ${
                    isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <a href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} className="block px-2 md:px-4 lg:px-8 md:py-2">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}