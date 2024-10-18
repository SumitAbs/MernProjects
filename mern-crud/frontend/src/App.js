// frontend/src/App.js

// View File 

import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { createItem, updateItem, deleteItem, fetchItems } from './api';

const App = () => {
  const [items, setItems] = useState([]); // State to hold the list of items

  const [editingItem, setEditingItem] = useState(null);

  const handleAdd = (item) => {
    createItem(item).then(() => {
      window.location.reload(); // refresh to show the new item
    });
  };

  
  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleUpdate = (updatedItem) => {
    updateItem(editingItem._id, updatedItem).then(() => {
      setEditingItem(null);
      fetchItems().then(data => setItems(data)); // Refresh the item list
    });
  };

  const handleDelete = (id) => {
      deleteItem(id).then(() => {
      fetchItems().then(data => setItems(data)); // Refresh the item list
    });
  };

  return (
    <div>
      <h1>CRUD Application..</h1>
      <ItemForm onSubmit={editingItem ? handleUpdate : handleAdd} item={editingItem} />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};



export default App;
