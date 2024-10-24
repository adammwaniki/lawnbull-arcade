import PropTypes from 'prop-types';

export default function ClientCardsFull({ image, title, subtitle, paragraphs, additionalImages, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-[#17163e] bg-opacity-80 p-8 rounded-lg shadow-lg w-full h-full md:w-4/5 md:h-4/5 overflow-y-auto relative" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-2xl hover:bg-red-600 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img src={image} alt={title} className="w-full h-64 object-cover rounded-md mb-6" />
        <h1 className="text-3xl font-arima font-extrabold tracking-wide text-[#fff] mb-2">{title}</h1>
        <h2 className="text-xl font-playfair-display font-medium tracking-wide italic text-[#fff] mb-4">{subtitle}</h2>
        <div className="prose prose-invert max-w-none mb-6">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4 text-[#fff]">{paragraph}</p>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {additionalImages.map((img, index) => (
            <img key={index} src={img} alt={`Additional image ${index + 1}`} className="w-full h-48 object-cover rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}

ClientCardsFull.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
  additionalImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};
