// pages/Apartment.js
import React, { useEffect, useState } from 'react';

const Apartment = ({ token, loggedInUser }) => {
  const [apartments, setApartments] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', city: '', price: '', latitude: '', longitude: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = () => {
    fetch('http://127.0.0.1:8000/api/apartments/')
      .then(res => res.json())
      .then(data => setApartments(data));
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingId
      ? `http://127.0.0.1:8000/api/apartments/${editingId}/`
      : 'http://127.0.0.1:8000/api/apartments/';
    const method = editingId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error');
        return res.json();
      })
      .then(() => {
        fetchApartments();
        setFormData({ title: '', description: '', city: '', price: '', latitude: '', longitude: '' });
        setEditingId(null);
      });
  };

  const handleEdit = (apt) => {
    setFormData({
      title: apt.title,
      description: apt.description,
      city: apt.city,
      price: apt.price,
      latitude: apt.latitude,
      longitude: apt.longitude,
    });
    setEditingId(apt.id);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this apartment?')) return;

    fetch(`http://127.0.0.1:8000/api/apartments/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => fetchApartments());
  };

  const loadComments = (apartmentId) => {
    setSelectedApartmentId(apartmentId);
    setEditingCommentId(null);
    setCommentText('');
    fetch(`http://127.0.0.1:8000/api/apartments/${apartmentId}/comments/`)
      .then(res => res.json())
      .then(data => setComments(data));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!token) return alert('Login required');

    const method = editingCommentId ? 'PUT' : 'POST';
    const url = editingCommentId
      ? `http://127.0.0.1:8000/api/comments/${editingCommentId}/`
      : `http://127.0.0.1:8000/api/apartments/${selectedApartmentId}/comments/`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ apartment: selectedApartmentId, text: commentText }),
    })
      .then(res => res.json())
      .then(() => {
        loadComments(selectedApartmentId);
        setCommentText('');
        setEditingCommentId(null);
      });
  };

  const handleEditComment = (comment) => {
    setCommentText(comment.text);
    setEditingCommentId(comment.id);
  };

  const handleDeleteComment = (id) => {
    if (!window.confirm('Delete this comment?')) return;
    fetch(`http://127.0.0.1:8000/api/comments/${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => loadComments(selectedApartmentId));
  };

  return (
    <div className="app-container">
      <h1 className="creator-heading">🏠 Apartment Listings</h1>

      {token && (
        <p>👤 Logged in as <strong>{loggedInUser}</strong></p>
      )}

      <form className="apt-form" onSubmit={handleSubmit}>
        <h3>{editingId ? '✏️ Edit Apartment' : '➕ Add Apartment'}</h3>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input type="number" step="0.0001" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
        <input type="number" step="0.0001" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Apartment</button>
      </form>

      <div className="apartment-list">
        {apartments.map(apt => (
          <div key={apt.id} className="apartment-card">
            <h2>{apt.title}</h2>
            <p><strong>City:</strong> {apt.city}</p>
            <p><strong>Price:</strong> ₹{apt.price}</p>
            <p>{apt.description}</p>
            <p><strong>Owner:</strong> {apt.owner_username}</p>

            {apt.owner_username === loggedInUser && (
              <>
                <button onClick={() => handleEdit(apt)}>✏️ Edit</button>
                <button onClick={() => handleDelete(apt.id)}>❌ Delete</button>
              </>
            )}

            <button onClick={() => loadComments(apt.id)}>💬 Comments</button>

            {selectedApartmentId === apt.id && (
              <div className="comment-section">
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    required
                  />
                  <button type="submit">{editingCommentId ? 'Update' : 'Post'} Comment</button>
                </form>
                {comments.map(c => (
                  <div key={c.id} className="comment">
                    <strong>{c.username}</strong>: {c.text}
                    {c.username === loggedInUser && (
                      <>
                        <button onClick={() => handleEditComment(c)}>✏️</button>
                        <button onClick={() => handleDeleteComment(c.id)}>❌</button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apartment;
