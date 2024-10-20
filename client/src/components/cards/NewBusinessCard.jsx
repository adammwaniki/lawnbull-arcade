import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

export default function NewBusinessCard() {
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    
    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        paragraphs: ['', '', ''],
        mainImage: null,
        additionalImages: [],
    });

    const onDrop = (acceptedFiles, field) => {
        if (acceptedFiles.length > 0) {
            // Handle file upload
            if (field === 'mainImage') {
                setFormData({ ...formData, [field]: acceptedFiles[0] });
            } else {
                setFormData({ ...formData, [field]: [...formData[field], ...acceptedFiles] });
            }
        } else {
            // Handle URL input
            const url = window.prompt("Enter image URL:");
            if (url) {
                if (field === 'mainImage') {
                    setFormData({ ...formData, [field]: { url } });
                } else {
                    setFormData({ ...formData, [field]: [...formData[field], { url }] });
                }
            }
        }
    };
    
      

      const { getRootProps: getMainImageProps, getInputProps: getMainImageInputProps } = useDropzone({
        onDrop: (files) => onDrop(files, 'mainImage'),
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        }
    });
    

    const { getRootProps: getAdditionalImagesProps, getInputProps: getAdditionalImagesInputProps } = useDropzone({
        onDrop: (files) => onDrop(files, 'additionalImages'),
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        },
        multiple: true,
    });
    

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (name === 'paragraphs') {
          const newParagraphs = [...formData.paragraphs];
          newParagraphs[index] = value;
          setFormData({ ...formData, paragraphs: newParagraphs });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
      

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
    
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setDarkMode(e.matches);
        
        mediaQuery.addEventListener('change', handleChange);
    
        return () => {
          mediaQuery.removeEventListener('change', handleChange);
        };
      }, []);
    
      //const toggleDarkMode = () => setDarkMode(!darkMode); currently not implementing the same navbar for admin as users

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Client-side validation
          if (!formData.name || !formData.name.trim()) {
            throw new Error('Business name is required');
          }
          if (!formData.subtitle || !formData.subtitle.trim()) {
            throw new Error('Business subtitle is required');
          }
      
          const formDataToSend = new FormData();
          formDataToSend.append('name', formData.name.trim());
          formDataToSend.append('subtitle', formData.subtitle.trim());
          formData.paragraphs.forEach((paragraph, index) => {
            formDataToSend.append(`paragraph${index + 1}`, paragraph.trim());
          });
          if (formData.mainImage) {
            if (formData.mainImage.url) {
              formDataToSend.append('mainImageUrl', formData.mainImage.url);
            } else {
              formDataToSend.append('mainImage', formData.mainImage);
            }
          }
          formData.additionalImages.forEach((image, index) => {
            if (image.url) {
              formDataToSend.append(`additionalImageUrl${index + 1}`, image.url);
            } else {
              formDataToSend.append(`additionalImage${index + 1}`, image);
            }
          });
      
          const token = localStorage.getItem('token');

      
          const response = await fetch(`${import.meta.env.VITE_API_URL}/business`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formDataToSend,
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred while creating the business');
          }
      
          const result = await response.json();
          console.log('Business created:', result);
          navigate('/admin/dashboard');
        } catch (error) {
          console.error('Error submitting form:', error);
          alert(`Error: ${error.message}`);
        }
      };   
      

    const removeImage = (index, field) => {
        const updatedImages = [...formData[field]];
        updatedImages.splice(index, 1);
        setFormData({ ...formData, [field]: updatedImages });
      };
      

  return (
    <div className="bg-[#17163e] pb-24 p-8 bg-opacity-80 shadow-lg w-full min-h-screen flex flex-col items-center justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
                <div {...getMainImageProps()} className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-md mb-6 flex items-center justify-center cursor-pointer">
                    <input {...getMainImageInputProps()} />
                    {formData.mainImage ? (
                        <>
                        <img 
                            src={formData.mainImage.url || URL.createObjectURL(formData.mainImage)} 
                            alt="Main image" 
                            className="w-full h-full object-cover rounded-md" 
                        />
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            removeImage(0, 'mainImage');
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
                        >
                            X
                        </button>
                        </>
                    ) : (
                        <p className="text-gray-400">Drag and drop main image here,<br/> or click to select file or enter URL</p>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => onDrop([], 'mainImage')}
                    className="mb-6 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Enter Image URL
                </button>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Business Name"
                    className="w-full bg-transparent text-3xl font-bold text-[#fff] mb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Business Motto or Catchphrase"
                    className="w-full bg-transparent text-xl text-[#fff] mb-4 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <div className="prose prose-invert max-w-none mb-6">
                    {formData.paragraphs.map((paragraph, index) => (
                        <textarea
                        key={index}
                        name="paragraphs"
                        value={paragraph}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder={`Enter paragraph ${index + 1}`}
                        className="w-full bg-transparent text-[#fff] mb-4 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        rows="4"
                        />
                    ))}
                </div>

                <div {...getAdditionalImagesProps()} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <input {...getAdditionalImagesInputProps()} />
                    {formData.additionalImages.map((img, index) => (
                        <div key={index} className="relative w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
                        <img 
                            src={img.url || URL.createObjectURL(img)} 
                            alt={`Additional image ${index + 1}`} 
                            className="w-full h-full object-cover rounded-md" 
                        />
                        <button
                            onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index, 'additionalImages');
                            }}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
                        >
                            X
                        </button>
                        </div>
                    ))}
                    {formData.additionalImages.length < 3 && (
                        <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                        <p className="text-gray-400 text-center xl:text-justify">Drag and drop 3 additional images here,<br/> or click to select files</p>
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => onDrop([], 'additionalImages')}
                    className="mb-6 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Enter Additional Image URL
                </button>
                <div className="flex justify-center space-x-10 mt-6">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="bg-gradient-to-tl from-orange-500/80 from-10% via-yellow-500/80 via-30% to-red-500/80 to-90% text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-indigo-500/80 from-10% via-sky-500/80 via-30% to-emerald-500/80 to-90% text-white py-2 px-4 rounded-md font-semibold uppercase tracking-wide hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
        <Footer darkMode={darkMode}/>
    </div>
    );
}

