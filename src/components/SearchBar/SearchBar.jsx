import { useState } from "react"; 
import { useDispatch } from "react-redux";
import { getProductsByName } from "../../Redux/action/action";

// eslint-disable-next-line react/prop-types
const SearchBar = () => {
  const [name, setName] = useState(""); // Agrega el estado para el valor del input
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };


  const handleSubmit = (e) => {
    if (name) {
        //console.log(name)
      e.preventDefault();
      dispatch(getProductsByName(name));
    } else {
      alert("El campo está vacío");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."

        //onKeyPress={handleSearch}
       onChange={(e)=>handleInputChange(e)} 
      />
      <button type="submit" onClick= {(e)=>handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
