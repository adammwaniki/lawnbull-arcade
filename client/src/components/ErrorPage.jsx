import Lottie from 'lottie-react';
import errorAnimation from '../assets/error-404-animation.json';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-10">
      <div className="w-1/2 max-w-md">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3  text-xl font-bold bg-emerald-500/80 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </button>
    </div>
  )
}
