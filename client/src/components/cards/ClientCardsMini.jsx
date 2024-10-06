//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ClientCardsMini({ image, title, subtitle, description, onViewMore }) {
  return (
    <div className="bg-[#17163e] bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
      </div>
      <h2 className="text-xl font-bold text-[#fff] mb-2">{title}</h2>
      <h3 className="text-lg text-[#fff] mb-2">{subtitle}</h3>
      <p className="text-[#fff] mb-4">{description.slice(0, 64)}...</p>
      <button
        onClick={onViewMore}
        className="w-full bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-block text-center"
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