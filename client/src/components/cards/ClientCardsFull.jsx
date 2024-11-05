import PropTypes from 'prop-types';

export default function ClientCardsFull({ 
  business = {},
  onClose 
}) {
  return (
    <div className="fixed inset-0 flex items-center mt-10 justify-center z-50 bg-black bg-opacity-85" onClick={onClose}>
      <div className="bg-[#17163e] bg-opacity-80 p-8 pt-14 rounded-lg shadow-lg w-full h-full md:w-4/5 md:h-4/5 overflow-y-auto relative mb-24 " onClick={(e) => e.stopPropagation()}>
        <button 
            onClick={onClose}
            className="absolute top-3 right-4 bg-red-500 text-white flex items-center justify-center rounded-2xl hover:bg-red-600 focus:outline-none px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Go Back
        </button>
        <img src={business.main_image_url} alt={business.name} className="w-full h-64 object-cover rounded-md mb-6" />
        <h1 className="text-3xl font-playfair-display font-extrabold tracking-wide text-[#fff] mb-2">{business.name}</h1>
        <h2 className="text-xl font-playfair-display font-medium tracking-wide italic text-[#fff] mb-4">{business.subtitle}</h2>
        <div className="prose prose-invert max-w-none mb-6">
          {[business.paragraph1, business.paragraph2, business.paragraph3].filter(Boolean).map((paragraph, index) => (
            <p key={index} className="mb-4 text-[#fff]">{paragraph}</p>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[business.additional_image_url1, business.additional_image_url2, business.additional_image_url3]
            .filter(Boolean)
            .map((img, index) => (
              <img key={index} src={img} alt={`Additional image ${index + 1}`} className="w-full h-48 object-cover rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}

ClientCardsFull.propTypes = {
  business: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
