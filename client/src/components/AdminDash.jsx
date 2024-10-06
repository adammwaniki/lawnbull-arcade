import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientCardsMini from './cards/ClientCardsMini';
import ClientCardsFull from './cards/ClientCardsFull';
import { AuthContext } from '../context/AuthContext'; // Assume you have an AuthContext

export default function AdminDash() {
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        // Replace this with actual API call
        const response = await fetch('/api/cards');
        const data = await response.json();
        setCards(data);
    };

    const handleCreateCard = async (newCard) => {
        // Replace with actual API call
        const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
        });
        const createdCard = await response.json();
        setCards([...cards, createdCard]);
    };

    const handleUpdateCard = async (updatedCard) => {
        // Replace with actual API call
        const response = await fetch(`/api/cards/${updatedCard.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCard),
        });
        const updated = await response.json();
        setCards(cards.map(card => card.id === updated.id ? updated : card));
    };

    const handleDeleteCard = async (cardId) => {
        // Replace with actual API call
        await fetch(`/api/cards/${cardId}`, { method: 'DELETE' });
        setCards(cards.filter(card => card.id !== cardId));
    };

    const filteredCards = cards
        .filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(card => filter === 'all' || card.category === filter);

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout(); // This function should clear the JWT token from localStorage or wherever it's stored
      navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="bg-[#17163e] min-h-screen text-white p-8 relative">
            {/* Logout button with functionality */}
            <button 
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            
            <div className="mb-8">
                <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded bg-gray-700 text-white"
                />
                <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="ml-4 p-2 rounded bg-gray-700 text-white"
                >
                <option value="all">All Categories</option>
                {/* Add more options based on your categories */}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCards.map(card => (
                <ClientCardsMini
                    key={card.id}
                    {...card}
                    onViewMore={() => setSelectedCard(card)}
                />
                ))}
            </div>

            {selectedCard && (
                <ClientCardsFull
                {...selectedCard}
                onClose={() => setSelectedCard(null)}
                onUpdate={handleUpdateCard}
                onDelete={() => handleDeleteCard(selectedCard.id)}
                />
            )}

            <button
                onClick={() => setSelectedCard({ title: '', subtitle: '', description: '', image: '' })}
                className="mt-8 bg-green-500 text-white p-2 rounded"
            >
                Create New Card
            </button>
        </div>
    );
}
