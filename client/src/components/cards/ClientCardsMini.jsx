import PropTypes from 'prop-types';

export default function ClientCardsMini({ main_image_url, name, subtitle, paragraph1 = '', onViewMore }) {
  return (
    <div className="bg-[#17163e] bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm mx-auto w-full sm:w-[400px]">
      <div className="relative h-[225px] mb-4">
        <img 
          src={main_image_url} 
          alt={name} 
          className="absolute w-full h-full object-cover rounded-md z-10"
        />
      </div>
      <h2 className="text-2xl font-playfair-display font-bold tracking-wide text-[#fff] mb-2">{name}</h2>
      <h3 className="text-lg font-playfair-display font-medium tracking-wide italic text-[#fff] mb-2">{subtitle}</h3>
      <p className="text-[#fff] mb-4 h-[48px] overflow-hidden">{paragraph1?.slice(0, 64)}...</p>
      <button
        onClick={onViewMore}
        className="w-full bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% text-white py-2 px-4 rounded-md font-arima text-lg font-extrabold uppercase tracking-wide hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 inline-block text-center"
      >
        View More
      </button>
    </div>
  );
}

ClientCardsMini.propTypes = {
  main_image_url: PropTypes.string,
  name: PropTypes.string,
  subtitle: PropTypes.string,
  paragraph1: PropTypes.string,
  onViewMore: PropTypes.func,
};
