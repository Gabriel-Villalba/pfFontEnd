import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, deleteCategory } from '../../../Redux/action/action.js';

const DeleteCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);


  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);



  return (
    <div className="deleteContainer" >
      <h2>Delete Categories</h2>

      <ul className="productsList">
        {categories.map(category => (
          <li key={category.id} className="item">
            {category.name}
            <button onClick={() => dispatch(deleteCategory(category.id))} className="deleteButton">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteCategories;