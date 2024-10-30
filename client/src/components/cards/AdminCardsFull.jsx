import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function AdminCardsFull({ 
  image, 
  title, 
  subtitle, 
  paragraphs, 
  additionalImages, 
  onClose, 
  onUpdate,
  onDelete,
  business 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBusiness, setEditedBusiness] = useState(business);

  const onDrop = (acceptedFiles, field) => {
    if (acceptedFiles.length > 0) {
        setEditedBusiness(prev => ({
            ...prev,
            [field]: acceptedFiles[0]
        }));
    } else {
        const url = window.prompt("Enter image URL:");
        if (url && url.trim()) {
            setEditedBusiness(prev => ({
                ...prev,
                [field]: url.trim()
            }));
        }
    }
};

  

  const { getRootProps: getMainImageProps, getInputProps: getMainImageInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'main_image_url'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const { getRootProps: getImage1Props, getInputProps: getImage1InputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'additional_image_url1'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const { getRootProps: getImage2Props, getInputProps: getImage2InputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'additional_image_url2'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const { getRootProps: getImage3Props, getInputProps: getImage3InputProps } = useDropzone({
    onDrop: (files) => onDrop(files, 'additional_image_url3'),
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const handleInputChange = (field, value) => {
    setEditedBusiness(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 mt-7 md:mt-0 flex items-center justify-center z-50 bg-black bg-opacity-85" onClick={onClose}>
      <div className="bg-[#17163e] bg-opacity-80 p-8  shadow-lg w-full h-full md:w-4/5 md:h-[90vh] overflow-y-auto relative mb-24 md:mb-12 mt-6" onClick={(e) => e.stopPropagation()}>
      <button 
            onClick={onClose}
            className="absolute top-3 right-2 bg-red-300 hover:bg-rose-600 text-slate-900 font-playfair-display tracking-wide font-semibold flex items-center justify-center rounded-2xl  focus:outline-none px-4 py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Go Back
        </button>

        {isEditing ? (
          <div {...getMainImageProps()} className="relative w-full h-64 border-2 border-dashed border-gray-300 rounded-md mb-6 flex items-center justify-center cursor-pointer">
            <input {...getMainImageInputProps()} />
            {editedBusiness.main_image_url ? (
                <img 
                    src={editedBusiness.main_image_url_preview || editedBusiness.main_image_url} 
                    alt={title} 
                    className="w-full h-full object-cover rounded-md" 
                />
                ) : (
                <p className="text-gray-400">Drag and drop main image here, or click to select file or enter URL</p>
            )}
          </div>
        ) : (
          <img src={image} alt={title} className="w-full h-64 object-cover rounded-md mb-6" />
        )}

        {isEditing ? (
          <>
            <input
              type="text"
              value={editedBusiness.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full mb-4 p-2 bg-gray-700 text-white rounded text-3xl"
              placeholder="Business Name"
            />
            <input
              type="text"
              value={editedBusiness.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full mb-4 p-2 bg-gray-700 text-white rounded text-xl"
              placeholder="Business Subtitle"
            />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-playfair-display font-extrabold tracking-wide text-[#fff] mb-2">{title}</h1>
            <h2 className="text-xl font-playfair-display font-medium tracking-wide italic text-[#fff] mb-4">{subtitle}</h2>
          </>
        )}

        <div className="prose prose-invert max-w-none mb-6">
          {isEditing ? (
            <>
              {['paragraph1', 'paragraph2', 'paragraph3'].map((field, index) => (
                <textarea
                  key={field}
                  value={editedBusiness[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full mb-4 p-2 bg-gray-700 text-white rounded"
                  placeholder={`Paragraph ${index + 1}`}
                  rows="4"
                />
              ))}
            </>
          ) : (
            paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 text-[#fff]">{paragraph}</p>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {isEditing ? (
            <>
              <div {...getImage1Props()} className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                <input {...getImage1InputProps()} />
                {editedBusiness.additional_image_url1 ? (
                    <img 
                        src={editedBusiness.additional_image_url1_preview || editedBusiness.additional_image_url1} 
                        alt="Additional 1" 
                        className="w-full h-full object-cover rounded-md" 
                    />
                    ) : (
                    <p className="text-gray-400">Add image 1</p>
                )}
              </div>
              
              <div {...getImage2Props()} className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                <input {...getImage2InputProps()} />
                {editedBusiness.additional_image_url2 ? (
                    <img 
                        src={editedBusiness.additional_image_url2_preview || editedBusiness.additional_image_url2} 
                        alt="Additional 2" 
                        className="w-full h-full object-cover rounded-md" 
                    />
                    ) : (
                    <p className="text-gray-400">Add image 2</p>
                )}
              </div>
              
              <div {...getImage3Props()} className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
                <input {...getImage3InputProps()} />
                    {editedBusiness.additional_image_url3 ? (
                        <img 
                            src={editedBusiness.additional_image_url3_preview || editedBusiness.additional_image_url3} 
                            alt="Additional 3" 
                            className="w-full h-full object-cover rounded-md" 
                        />
                        ) : (
                        <p className="text-gray-400">Add image 3</p>
                    )}
              </div>
            </>
          ) : (
            additionalImages.map((img, index) => (
              <img key={index} src={img} alt={`Additional image ${index + 1}`} className="w-full h-48 object-cover rounded-md" />
            ))
          )}
        </div>

        <div className="flex justify-center space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors font-semibold"
            >
              Edit Business
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  onUpdate(editedBusiness);
                  setIsEditing(false);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors font-semibold"
              >
                Save and Update
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedBusiness(business);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors font-semibold"
              >
                Cancel
              </button>
            </>
          )}
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors font-semibold"
          >
            Delete Business
          </button>
        </div>
      </div>
    </div>
  );
}

AdminCardsFull.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    additionalImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClose: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    business: PropTypes.object.isRequired
  };
