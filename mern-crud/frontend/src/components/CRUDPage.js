import React, { useState } from 'react';
import ItemForm from './ItemForm'; // Import your ItemForm component

const CRUDPage = () => {
  const [items, setItems] = useState([]); // State to hold the list of items
  const [currentItem, setCurrentItem] = useState(null); // State to hold the item being edited

  const handleAddItem = (item) => {
    setItems([...items, { ...item, id: Date.now() }]); // Add new item with a unique ID
  };

  const handleEditItem = (item) => {
    setItems(items.map((i) => (i.id === item.id ? item : i))); // Update the existing item
    setCurrentItem(null); // Reset current item after editing
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id)); // Remove item by ID
  };

  const handleEditClick = (item) => {
    setCurrentItem(item); // Set item to edit
  };

  return (
    <div>
      <h1>CRUD Example</h1>
      <ItemForm onSubmit={currentItem ? handleEditItem : handleAddItem} item={currentItem} />
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => handleEditClick(item)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDPage;
