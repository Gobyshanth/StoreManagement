import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { fetchData } from '../../Redux/Slices/dataSlice'; // Import the fetchData thunk
import Header from '../header/Header';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { items: cardData, status, error } = useSelector((state) => state.data); // Access data from the Redux store

  // Fetch data when the component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ratings');
        if (response.ok) {
          const data = await response.json();
          setRatings(data); // Set the ratings from the backend
        } else {
          console.error('Failed to fetch ratings');
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  // Group data by category
  const categories = Object.keys(cardData).reduce((acc, key) => {
    const card = cardData[key];
    const category = card.category || 'Uncategorized'; // Default to 'Uncategorized' if no category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ id: key, ...card });
    return acc;
  }, {});

  const [sliderIndex, setSliderIndex] = useState({}); // Track the current index for each category

  const handleNext = (category) => {
    setSliderIndex((prev) => ({
      ...prev,
      [category]: Math.min((prev[category] || 0) + 4, categories[category].length - 4),
    }));
  };

  const handlePrevious = (category) => {
    setSliderIndex((prev) => ({
      ...prev,
      [category]: Math.max((prev[category] || 0) - 4, 0),
    }));
  };

  // State to manage ratings for each product
  const [ratings, setRatings] = useState({});
  const [favorites, setFavorites] = useState([]); // State to manage favorite products
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    address: '',
    pieces: 1,
    paymentMethod: 'card', // Default payment method
  });

  const handleRating = async (productId, rating) => {
    try {
      const response = await fetch('http://localhost:5000/api/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, rating }),
      });

      if (response.ok) {
        setRatings((prevRatings) => ({
          ...prevRatings,
          [productId]: {
            ...prevRatings[productId],
            userRating: rating, // Update the user's rating
          },
        }));
      } else {
        console.error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const calculateAverageRating = (productId) => {
    const productRatings = ratings[productId]?.allRatings || [];
    if (productRatings.length === 0) return 0;
    const total = productRatings.reduce((sum, rating) => sum + rating, 0);
    return (total / productRatings.length).toFixed(1); // Return average with 1 decimal place
  };

  const toggleFavorite = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(productId)
        ? prevFavorites.filter((id) => id !== productId) // Remove from favorites
        : [...prevFavorites, productId] // Add to favorites
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBuyClick = (card) => {
    setFormData({
      ...formData,
      cardDetails: {
        title: card.title,
        description: card.description,
      },
    });
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
  };

  // Prevent background scrolling when popup is shown
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://pixgeo-management.vercel.app/my-app/src/services/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        setShowPopup(false); // Close the popup after submission
      } else {
        const errorData = await response.json();
        alert("Failed to send order details: " + errorData.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        textAlign: 'center',
        // marginTop: '30px',
        fontFamily: 'Courier',
        backgroundColor: '#DBD0E3',
       
      }}
    >
      <Header />
      <h1
        style={{
          fontSize: '3rem',
          color: '#30002C',
          marginBottom: '20px',
          fontWeight: 'bold',
        }}
      >
        Welcome to the PIXGEO Store
      </h1>

      {/* Display loading or error messages */}
      {status === 'loading' && (
        <p style={{ fontSize: '1.5rem', color: '#007BFF' }}>Loading...</p>
      )}
      {status === 'failed' && (
        <p style={{ fontSize: '1.5rem', color: 'red' }}>{error}</p>
      )}

      {/* Display categories and their cards */}
      {Object.keys(categories).map((category) => {
        const currentIndex = sliderIndex[category] || 0;

        return (
          <div
            key={category}
            style={{
              marginBottom: '40px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              margin: '20px',
            }}
          >
            <h2
              style={{
                textAlign: 'left',
                marginLeft: '20px',
                fontSize: '2rem',
                color: '#30002C',
                borderBottom: '2px solid rgb(216, 216, 216)',
                paddingBottom: '5px',
              }}
            >
              {category} <span style={{ fontSize: '1.2rem', color: '#555' }}>({categories[category].length} products)</span>
            </h2>

            {/* Navigation Controls and Card Container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#DBD0E3', // Red background
                padding: '20px 10px', // Add padding (20px top/bottom, 10px left/right)
                gap: '10px', // Add gap between elements
              }}
            >
              {/* Previous Button */}
              <button
                onClick={() => handlePrevious(category)}
                disabled={currentIndex === 0} // Disable if at the beginning
                style={{
                  padding: '10px', // Add padding for better spacing
                  fontSize: '1.5rem', // Adjust font size for better visibility
                  backgroundColor: currentIndex === 0 ? '#ccc' : '#82408B', // Gray when disabled, purple otherwise
                  color: '#fff', // White text color
                  border: 'none', // Remove border
                  borderRadius: '50%', // Make the button circular
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', // Disable pointer when inactive
                  marginRight: '10px', // Add spacing to the right
                  width: '50px', // Fixed width for consistency
                  height: '50px', // Fixed height for consistency
                  display: 'flex', // Center the content
                  alignItems: 'center', // Vertically center the content
                  justifyContent: 'center', // Horizontally center the content
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                  transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth transition for hover effects
                }}
                onMouseEnter={(e) => {
                  if (currentIndex !== 0) {
                    e.currentTarget.style.transform = 'scale(1.1)'; // Slight zoom on hover
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset zoom on hover out
                }}
              >
                &lt;
              </button>

              {/* Horizontal Scrolling Container */}
              <div
                style={{
                  backgroundColor: 'fff', // White background
                  display: 'flex',
                  overflow: 'hidden', // Hide overflow content
                  whiteSpace: 'nowrap', // Prevent wrapping of cards
                  position: 'relative',
                  scrollBehavior: 'smooth', // Smooth scrolling
                  WebkitOverflowScrolling: 'touch', // Enable smooth scrolling on iOS
                  flex: 1, // Allow the container to take up remaining space
                }}
              >
                {categories[category].slice(currentIndex, currentIndex + 4).map((card) => (
                  <div
                    key={card.id}
                    style={{
                      flex: '0 0 80%', // Each card takes up 80% of the container width for better visibility on mobile
                      maxWidth: '245px',
                      marginRight: '20px',
                      border: '1px solid #ddd',
                      borderRadius: '10px',
                      padding: '20px',
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      textAlign: 'left',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for zoom effect
                      backgroundColor: '#fff',
                      
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)'; // Zoom in
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)'; // Add a stronger shadow
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'; // Reset to original size
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Reset shadow
                    }}
                  >
                    <div >
                      <img
                        src={card.imageUrl || 'https://dummyimage.com/300x200/000/fff'}
                        alt={card.title}
                        onError={(e) => {
                          e.target.src = 'https://dummyimage.com/300x200/000/fff';
                        }}
                        style={{
                          width: '100%',
                          height: '150px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginBottom: '10px',
                        }}
                      />
                      <div>
                        <h3 style={{ fontSize: '1.2rem', color: '#30002C', marginBottom: '10px' }}>
                          {card.title}
                        </h3>
                        <p style={{ fontSize: '1rem', color: '#555' }}>{card.description}</p>

                        {/* Star Rating */}
                        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                onClick={() => handleRating(card.id, star)} // Handle star rating
                                style={{
                                  fontSize: '1.5rem',
                                  color: ratings[card.id]?.userRating >= star ? '#FFD700' : '#ddd', // Fill stars based on user's rating
                                  cursor: 'pointer',
                                  marginRight: '5px',
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <span style={{ fontSize: '1rem', color: '#555', float: 'right' }}>
                            {calculateAverageRating(card.id)}
                          </span>
                        </div>

                        {/* Pay Button */}
                        <button
                          onClick={() => handleBuyClick(card)} // Handle pay button click
                          style={{
                            padding: '10px 20px',
                            backgroundColor: '#1A0118',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                          }}
                        >
                          Order Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handleNext(category)}
                disabled={currentIndex + 4 >= categories[category].length} // Disable if at the end
                style={{
                  padding: '10px', // Add padding for better spacing
                  fontSize: '1.5rem', // Adjust font size for better visibility
                  backgroundColor: currentIndex + 4 >= categories[category].length ? '#ccc' : '#82408B', // Gray when disabled, purple otherwise
                  color: currentIndex + 4 >= categories[category].length ? '#615B62' : '#fff',// White text color
                  border: 'none', // Remove border
                  borderRadius: '50%', // Make the button circular
                  cursor: currentIndex + 4 >= categories[category].length ? 'not-allowed' : 'pointer', // Disable pointer when inactive
                  marginLeft: '10px', // Add spacing to the left
                  width: '50px', // Fixed width for consistency
                  height: '50px', // Fixed height for consistency
                  display: 'flex', // Center the content
                  alignItems: 'center', // Vertically center the content
                  justifyContent: 'center', // Horizontally center the content
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add a subtle shadow
                  transition: 'background-color 0.3s ease, transform 0.3s ease', // Smooth transition for hover effects
                }}
                onMouseEnter={(e) => {
                  if (currentIndex + 4 < categories[category].length) {
                    e.currentTarget.style.transform = 'scale(1.1)'; // Slight zoom on hover
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'; // Reset zoom on hover out
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        );
      })}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '600px', // Default width for larger screens
            maxWidth: '90%', // Ensure it doesn't exceed screen width
          }}
        >
          <style>
            {`
              @media (max-width: 768px) {
                .popup-container {
                  width: 90%; /* Adjust width for mobile */
                  padding: 20px; /* Reduce padding for smaller screens */
                }
                .popup-container h2 {
                  font-size: 1.5rem; /* Adjust heading size */
                }
                .popup-container input,
                .popup-container textarea,
                .popup-container select {
                  font-size: 1rem; /* Adjust input font size */
                }
                .popup-container button {
                  font-size: 0.9rem; /* Adjust button font size */
                  padding: 8px 15px; /* Adjust button padding */
                }
              }
            `}
          </style>
          <div className="popup-container">
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Order Details</h2>
            <form onSubmit={handleSubmit}>
              {/* Username Field */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '15px',
                }}
              >
                <label
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'left', // Align label text to the left
                  }}
                >
                  Username:
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '15px',
                }}
              >
                <label
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'left', // Align label text to the left
                  }}
                >
                  Phone Number:
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                  required
                />
              </div>

              {/* Address Field */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '15px',
                }}
              >
                <label
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'left', // Align label text to the left
                  }}
                >
                  Address:
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    resize: 'none',
                  }}
                  rows="3"
                  required
                ></textarea>
              </div>

              {/* Number of Pieces Field */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '15px',
                }}
              >
                <label
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'left', // Align label text to the left
                  }}
                >
                  Number of Pieces:
                </label>
                <input
                  type="number"
                  name="pieces"
                  value={formData.pieces}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                  min="1"
                  required
                />
              </div>

              {/* Payment Method Field */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '15px',
                }}
              >
                <label
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'left', // Align label text to the left
                  }}
                >
                  Payment Method:
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                  }}
                >
                  <option value="card">Card Payment</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>

              {/* Buttons */}
              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={handleClosePopup}
                  style={{
                    marginRight: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
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
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;