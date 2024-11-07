import { useState, useEffect } from 'react';
import * as emailjs from '@emailjs/browser';

const ContactCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    countryCode: '',
    message: ''
  });

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const templateParams = {
      to_name: "Lawnbull Admin",
      from_name: `${formData.name} from ${formData.businessName}`,
      reply_to: formData.email,
      message: `Email: ${formData.email}
    Phone: ${formData.countryCode} ${formData.phone}
    Message: ${formData.message}`
    };
    
    
  
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((response) => {
      //console.log('SUCCESS!', response.status, response.text);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        businessName: '',
        email: '',
        phone: '',
        countryCode: '',
        message: ''
      });
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert('Failed to send message. Please try again later.');
    });
  };
  
  
  

  return (
    <div className="max-w-sm mx-auto bg-[#17163e] bg-opacity-80   rounded-lg p-6">
      <h2 className="text-2xl font-arima font-extrabold text-white mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="name">Name:</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            placeholder="First and Last Name"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="businessName">Business Name:</label>
          <input 
            type="text" 
            name="businessName" 
            id="businessName" 
            value={formData.businessName} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            placeholder="Business Name"
            required 
          />
        </div>
        <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="email">Email:</label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="your-email@example.com"
                required 
            />
        </div>
        <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="phone">Telephone:</label>
            <div className="flex">
                    <select
                    name="countryCode"
                    id="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-1/2 p-2 border border-gray-300 rounded-l"
                    >
                    <option value="">Select</option>
                        <option value="+254">+254 (Kenya)</option>
                        <option value="+1">+1 (USA, Canada)</option>
                        <option value="+43">+43 (Austria)</option>
                        <option value="+355">+355 (Albania)</option>
                        <option value="+32">+32 (Belgium)</option>
                        <option value="+359">+359 (Bulgaria)</option>
                        <option value="+91">+91 (India)</option>
                        <option value="+98">+98 (Iran)</option>
                        <option value="+353">+353 (Ireland)</option>
                        <option value="+972">+972 (Israel)</option>
                        <option value="+86">+86 (China)</option>
                        <option value="+45">+45 (Denmark)</option>
                        <option value="+20">+20 (Egypt)</option>
                        <option value="+372">+372 (Estonia)</option>
                        <option value="+34">+34 (Spain)</option>
                        <option value="+46">+46 (Sweden)</option>
                        <option value="+41">+41 (Switzerland)</option>
                        <option value="+39">+39 (Italy)</option>
                        <option value="+63">+63 (Philippines)</option>
                        <option value="+48">+48 (Poland)</option>
                        <option value="+351">+351 (Portugal)</option>
                        <option value="+7">+7 (Russia, Kazakhstan)</option>
                        <option value="+60">+60 (Malaysia)</option>
                        <option value="+64">+64 (New Zealand)</option>
                        <option value="+65">+65 (Singapore)</option>
                        <option value="+81">+81 (Japan)</option>
                        <option value="+27">+27 (South Africa)</option>
                        <option value="+82">+82 (South Korea)</option>
                        <option value="+44">+44 (UK)</option>
                        <option value="+49">+49 (Germany)</option>
                        <option value="+30">+30 (Greece)</option>
                        <option value="+55">+55 (Brazil)</option>
                        <option value="+62">+62 (Indonesia)</option>
                        <option value="+66">+66 (Thailand)</option>
                        <option value="+47">+47 (Norway)</option>

                    </select>
                    <input 
                    type="tel" 
                    name="phone" 
                    id="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    className="w-3/4 p-2 border border-gray-300 rounded-r" 
                    placeholder="xxx-xxx-xxxx"
                    required 
                    />
            </div>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1" htmlFor="message">Message:</label>
          <textarea 
            name="message" 
            id="message" 
            value={formData.message} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 rounded" 
            rows="4" 
            placeholder="Type your message here"
            required 
          />
        </div>
        <div className="mt-6 flex justify-center">
            <button 
            type="submit" 
            className=" bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% text-white py-2 px-4 rounded-md  tracking-wide hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-arima font-extrabold"
            >
            Send Message
            </button>
        </div>
      </form>
      
    </div>
  );
};

export default ContactCard;
