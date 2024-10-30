import { useState, useEffect, useMemo } from 'react';
import Lottie from "lottie-react";
import Navbar from "./Navbar";
import ClientCardsMini from "./cards/ClientCardsMini";
import ClientCardsFull from "./cards/ClientCardsFull";
import { dummyCards } from './DummyData';
import onlineMarketingAnimation from '../assets/online-marketing-animation.json';
import Footer from './Footer';

export default function MarketingPage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    // Fetch cards from API
    fetchCards();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Update the fetchCards function to use the API
const fetchCards = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/businesses`);
    if (!response.ok) {
      throw new Error('Failed to fetch businesses');
    }
    const data = await response.json();
    setCards(data);
  } catch (error) {
    console.error('Error fetching businesses:', error);
    // Fallback to dummy data in case of error
    setCards(dummyCards);
  }
};


const handleViewMore = (card) => {
  const business = {
    main_image_url: card.main_image_url,
    name: card.name,
    subtitle: card.subtitle,
    paragraph1: card.paragraph1,
    paragraph2: card.paragraph2,
    paragraph3: card.paragraph3,
    additional_image_url1: card.additional_image_url1,
    additional_image_url2: card.additional_image_url2,
    additional_image_url3: card.additional_image_url3
  };
  setSelectedCard(business);
};


  const handleCloseFullCard = () => {
    setSelectedCard(null);
  };

  const MemoizedLottieAnimation = useMemo(() => (
    <Lottie 
      animationData={onlineMarketingAnimation} 
      loop={true}
      autoplay={true}
      style={{ width: '100%', height: '100%' }}
    />
  ), []);

  return (
    <div className={`relative min-h-screen flex flex-col ${darkMode ? 'dark bg-black' : 'bg-white'}`}>
      <div className="fixed opacity-60 inset-0 z-0">
        {MemoizedLottieAnimation}
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          <div className="mt-8 w-full md:w-1/3 md:fixed md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 flex justify-center md:justify-end z-20">
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          <div className="container mx-auto px-4 py-8 z-10 mt-7 md:mt-0 md:ml-0 md:mr-[calc(33.33%+10px)] max-w-full pb-24">
            <h1 className="text-center md:text-left text-[4rem] lg:text-[6vw] font-playfair-display font-bold mb-8 text-[#17163e] bg-clip-text dark:text-white">Market With Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[80vw] gap-8">
              {cards.map((card) => (
                <ClientCardsMini
                  key={card.id}
                  {...card}
                  onViewMore={() => handleViewMore(card)}
                />
              ))}
            </div>
          </div>
          {selectedCard && (
            <ClientCardsFull 
              business={selectedCard} 
              onClose={handleCloseFullCard} 
            />
          )}

        </div>
        <div className="relative z-10">
          <Footer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
