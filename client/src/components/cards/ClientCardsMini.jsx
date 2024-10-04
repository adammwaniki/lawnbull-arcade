//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ClientCardsMini({ image, title, subtitle, description, onViewMore }) {
  return (
    <div className="bg-[#17163e] bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold text-[#fff] mb-2">{title}</h2>
      <h3 className="text-lg text-[#fff] mb-2">{subtitle}</h3>
      <p className="text-[#fff] mb-4">{description.slice(0, 32)}...</p>
      <button
        onClick={onViewMore}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-block text-center"
      >
        View More
      </button>
    </div>
  );
}

ClientCardsMini.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onViewMore: PropTypes.func.isRequired,
};
/*
// keeping this one for when I use an api with IDs so include id in the props
ClientCardsMini.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
*/