import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsByName } from "../../Redux/action/action";

const SearchBar = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(getProductsByName(name));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={name}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} 
      />
      <button type="button" onClick={() => name ? dispatch(getProductsByName(name)):alert("El campo está vacío")}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
