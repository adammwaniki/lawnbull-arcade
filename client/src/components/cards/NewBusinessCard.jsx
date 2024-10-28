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
      additionalImage1: null,
      additionalImage2: null,
      additionalImage3: null
     });
    
     const onDrop = (acceptedFiles, field) => {
          if (acceptedFiles.length > 0) {
              setFormData({ ...formData, [field]: acceptedFiles[0] });
          } else {
              const url = window.prompt("Enter image URL:");
              if (url && url.trim()) {
                  setFormData({ ...formData, [field]: { url: url.trim() } });
              }
          }
      };
  
  


      const { getRootProps: getMainImageProps, getInputProps: getMainImageInputProps } = useDropzone({
        onDrop: (files) => onDrop(files, 'mainImage'),
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif']
        }
    });
    

    // Create three separate dropzone hooks for additional images
    const { getRootProps: getAdditionalImage1Props, getInputProps: getAdditionalImage1InputProps } = useDropzone({
      onDrop: (files) => onDrop(files, 'additionalImage1'),
      accept: {
          'image/*': ['.jpeg', '.jpg', '.png', '.gif']
      }
    });

    const { getRootProps: getAdditionalImage2Props, getInputProps: getAdditionalImage2InputProps } = useDropzone({
      onDrop: (files) => onDrop(files, 'additionalImage2'),
      accept: {
          'image/*': ['.jpeg', '.jpg', '.png', '.gif']
      }
    });

    const { getRootProps: getAdditionalImage3Props, getInputProps: getAdditionalImage3InputProps } = useDropzone({
      onDrop: (files) => onDrop(files, 'additionalImage3'),
      accept: {
          'image/*': ['.jpeg', '.jpg', '.png', '.gif']
      }
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
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        const name = formData.name?.trim();
        const subtitle = formData.subtitle?.trim();
        
        if (!name || !subtitle) {
            alert('Name and subtitle are required fields');
            return;
        }
        
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('subtitle', subtitle);
        
        // Only append paragraphs if they exist
        if (formData.paragraphs[0]) formDataToSend.append('paragraph1', formData.paragraphs[0].trim());
        if (formData.paragraphs[1]) formDataToSend.append('paragraph2', formData.paragraphs[1].trim());
        if (formData.paragraphs[2]) formDataToSend.append('paragraph3', formData.paragraphs[2].trim());
    
        // Handle image uploads with proper checks
        if (formData.mainImage) {
            if (formData.mainImage instanceof File) {
                formDataToSend.append('mainImage', formData.mainImage);
            } else if (formData.mainImage.url) {
                formDataToSend.append('mainImageUrl', formData.mainImage.url);
            }
        }
        
        if (formData.additionalImage1) {
          if (formData.additionalImage1 instanceof File) {
              formDataToSend.append('additionalImage1', formData.additionalImage1);
          } else if (formData.additionalImage1.url) {
              formDataToSend.append('additionalImageUrl1', formData.additionalImage1.url);
          }
        }

        if (formData.additionalImage2) {
          if (formData.additionalImage2 instanceof File) {
              formDataToSend.append('additionalImage2', formData.additionalImage2);
          } else if (formData.additionalImage2.url) {
              formDataToSend.append('additionalImageUrl2', formData.additionalImage2.url);
          }
        }

        if (formData.additionalImage3) {
          if (formData.additionalImage3 instanceof File) {
              formDataToSend.append('additionalImage3', formData.additionalImage3);
          } else if (formData.additionalImage3.url) {
              formDataToSend.append('additionalImageUrl3', formData.additionalImage3.url);
          }
        }
        // Logging the form data to the console for debugging
        for (let pair of formDataToSend.entries()) {
              console.log(pair[0] + ': ' + pair[1]); 
          }
          try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            const response = await fetch(`${import.meta.env.VITE_API_URL}/business`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: formDataToSend
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 422) {
                    alert(`Validation error: ${errorData.error}`);
                } else {
                    alert(`Error: ${errorData.error || 'Unknown error occurred'}`);
                }
                return;
            }
            
            await response.json();
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error creating business card:', error);
            alert('Failed to create business card. Please try again.');
        }
      };
    
    

      const removeImage = (index, field) => {
        setFormData({ ...formData, [field]: null });
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        {/* Additional Image 1 */}
                                        <div className="flex flex-col gap-2">
                        <div {...getAdditionalImage1Props()} className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                        <input {...getAdditionalImage1InputProps()} />
                            {formData.additionalImage1 ? (
                                <>
                                    <img
                                        src={formData.additionalImage1.url || URL.createObjectURL(formData.additionalImage1)}
                                        alt="Additional image 1"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(0, 'additionalImage1');
                                        }}
                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
                                    >
                                        X
                                    </button>
                                </>
                            ) : (
                                <p className="text-gray-400">Add image 1</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => onDrop([], 'additionalImage1')}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Enter Image 1 URL
                        </button>
                    </div>

                    {/* Additional Image 2 */}
                    <div className="flex flex-col gap-2">
                        <div {...getAdditionalImage2Props()} className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                        <input {...getAdditionalImage2InputProps()} />
                            {formData.additionalImage2 ? (
                                <>
                                    <img
                                        src={formData.additionalImage2.url || URL.createObjectURL(formData.additionalImage2)}
                                        alt="Additional image 2"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(0, 'additionalImage2');
                                        }}
                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
                                    >
                                        X
                                    </button>
                                </>
                            ) : (
                                <p className="text-gray-400">Add image 2</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => onDrop([], 'additionalImage2')}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Enter Image 2 URL
                        </button>
                    </div>

                    {/* Additional Image 3 */}
                    <div className="flex flex-col gap-2">
                        <div {...getAdditionalImage3Props()} className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                        <input {...getAdditionalImage3InputProps()} />
                            {formData.additionalImage3 ? (
                                <>
                                    <img
                                        src={formData.additionalImage3.url || URL.createObjectURL(formData.additionalImage3)}
                                        alt="Additional image 3"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(0, 'additionalImage3');
                                        }}
                                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold"
                                    >
                                        X
                                    </button>
                                </>
                            ) : (
                                <p className="text-gray-400">Add image 3</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => onDrop([], 'additionalImage3')}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Enter Image 3 URL
                        </button>
                    </div>
                </div>

                <div className="flex justify-center space-x-10 mt-6">
                    <button
                        type="button"
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

