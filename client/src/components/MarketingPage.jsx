import { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import Navbar from "./Navbar";
import ClientCardsMini from "./cards/ClientCardsMini";
import ClientCardsFull from "./cards/ClientCardsFull";
import { dummyCards } from './DummyData';
import onlineMarketingAnimation from '../assets/online-marketing-animation.json';



export default function MarketingPage() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    // Simulating API call with setTimeout
    setTimeout(() => {
      setCards(dummyCards);
    }, 1000);
  };

  const handleViewMore = (card) => {
    setSelectedCard(card);
  };

  const handleCloseFullCard = () => {
    setSelectedCard(null);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Lottie 
          animationData={onlineMarketingAnimation} 
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="relative z-10 h-full overflow-y-auto overflow-x-hidden">
        <div className="w-full md:w-1/3 md:fixed md:right-0 md:top-1/2 md:transform md:-translate-y-1/2 flex justify-center md:justify-end z-20">
          <Navbar />
        </div>
        <div className="container mx-auto px-4 py-8 z-10 mt-16 md:mt-0 md:ml-0 md:mr-[calc(33.33%+10px)] max-w-full">
          <h1 className="text-center md:text-left text-[4rem] lg:text-[6vw] font-spicy-rice mb-8 bg-gradient-to-br from-[#A6A5A4] from-10% via-[#5855cb] via-30% to-[#66321b] to-70% text-transparent bg-clip-text">Market With Us</h1>
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
          <ClientCardsFull {...selectedCard} onClose={handleCloseFullCard} />
        )}
      </div>
    </div>
  );
}