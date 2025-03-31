import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, updateItem, deleteItem, addItem } from '../Redux/Slices/dataSlice'; // Add addItem action
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from '../Admin/module.css';

const Admins = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { items, status, error } = useSelector((state) => state.data);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
  });

  const [categories, setCategories] = useState(['ball', 'pads', 'gloves']); // Default categories
  const [newCategory, setNewCategory] = useState(''); // For adding new categories
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editKey, setEditKey] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    if (!value.trim()) {
      errorMsg = `${name} is required`;
    } else if (name === 'imageUrl' && !isValidImageUrl(value)) {
      errorMsg = 'Invalid image URL. Please provide a valid image link.';
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = `* ${key} is required`;
      } else if (key === 'imageUrl' && !isValidImageUrl(formData[key])) {
        newErrors[key] = 'Invalid image URL. Please provide a valid image link.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        await dispatch(updateItem({ ...formData, id: editKey })).unwrap();
        setIsEditing(false);
        setEditKey(null);
      } else {
        await dispatch(addItem(formData)).unwrap(); // Add new product
      }
      setShowModal(false); // Close the modal after saving
      dispatch(fetchData());
      setFormData({ title: '', description: '', imageUrl: '', category: '' });
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  const handleEdit = (key) => {
    const item = items[key];
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
    });
    setIsEditing(true);
    setEditKey(key);
    setShowModal(true); // Show the modal
  };

  const handleAddProduct = () => {
    setFormData({ title: '', description: '', imageUrl: '', category: '' }); // Reset form data
    setIsEditing(false); // Ensure it's not in editing mode
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    setIsEditing(false);
    setEditKey(null);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter((category) => category !== categoryToDelete));
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.adminTitle}>Admin Panel</h2>

      {/* Go to Home Button */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/')} // Navigate to the home page
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Go to Home
        </button>

        {/* Add Products Button */}
        <button
          onClick={handleAddProduct}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Products
        </button>
      </div>

      {/* Add Category Section */}
      {/* <div style={{ marginBottom: '20px' }}>
        <h3>Add New Category</h3>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter new category"
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <button
          onClick={handleAddCategory}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Add Category
        </button>
      </div> */}

      {/* Delete Category Section */}
      {/* <div style={{ marginBottom: '20px' }}>
        <h3>Delete Category</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {categories.map((category) => (
            <li
              key={category}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <span>{category}</span>
              <button
                onClick={() => handleDeleteCategory(category)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#FF4D4D',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div> */}

      {/* Table for Displaying Data */}
      <div>
        <h3>Saved Data</h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Title</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Category</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Image</th>
              <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(items).map((key) => {
              const item = items[key];
              return (
                <tr key={key}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.title}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.description}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{item.category}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <button
                      onClick={() => handleEdit(key)}
                      style={{
                        marginRight: '10px',
                        padding: '5px 10px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteItem(key))}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#FF4D4D',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding/Editing */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f5f5f5', // Light gray background
            padding: '40px', // Default padding
            width: '600px', // Default width for larger screens
            height: 'auto', // Adjust height automatically based on content
            maxHeight: '80vh', // Ensure the modal doesn't exceed the viewport height
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Slightly larger shadow for emphasis
            borderRadius: '10px',
            zIndex: 1000,
            overflowY: 'auto', // Add vertical scrolling if content overflows
            boxSizing: 'border-box',
            // Responsive styles for mobile
            maxWidth: '90%', // Limit width to 90% of the viewport on smaller screens
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>{isEditing ? 'Edit Product' : 'Add Product'}</h3>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#333',
              }}
            >
              ✖
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.title && <span style={{ color: 'red', fontSize: '12px' }}>{errors.title}</span>}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.description && (
                <span style={{ color: 'red', fontSize: '12px' }}>{errors.description}</span>
              )}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'delete-category') {
                    const categoryToDelete = prompt('Enter the category name to delete:');
                    if (categoryToDelete && categories.includes(categoryToDelete)) {
                      setCategories(categories.filter((category) => category !== categoryToDelete));
                      alert(`Category "${categoryToDelete}" deleted successfully.`);
                    } else {
                      alert('Category not found or invalid input.');
                    }
                  } else if (value === 'add-new-category') {
                    setFormData({ ...formData, category: '' });
                  } else {
                    setFormData({ ...formData, category: value });
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="add-new-category">Add New Category</option>
                <option value="delete-category">Delete Category</option>
              </select>
              {formData.category === '' && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    style={{
                      width: 'calc(100% - 120px)',
                      padding: '10px',
                      marginRight: '10px',
                      boxSizing: 'border-box',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCategory.trim() && !categories.includes(newCategory.trim())) {
                        setCategories([...categories, newCategory.trim()]);
                        setFormData({ ...formData, category: newCategory.trim() });
                        setNewCategory('');
                      }
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#007BFF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                  >
                    Add
                  </button>
                </div>
              )}
              {errors.category && (
                <span style={{ color: 'red', fontSize: '12px' }}>{errors.category}</span>
              )}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label>Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
              {errors.imageUrl && (
                <span style={{ color: 'red', fontSize: '12px' }}>{errors.imageUrl}</span>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{
                  marginRight: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const isValidImageUrl = (url) => {
  const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
  try {
    const parsedUrl = new URL(url); // Check if it's a valid URL
    return imageExtensions.test(parsedUrl.pathname); // Check if it ends with a valid image extension
  } catch (error) {
    return false; // Invalid URL
  }
};

export default Admins;
