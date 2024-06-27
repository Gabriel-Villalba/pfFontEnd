import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCategory } from '../../../Redux/action/action.js';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postCategory({ name: categoryName }));
    setCategoryName('');
  };

  return (
    <div className="createContainer">
      <h2>Create Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          required
          className="createCategoryInput"
        />
        <button type="submit" className="createButton">Create</button>
      </form>
    </div>
  );
};

export default CreateCategory;
