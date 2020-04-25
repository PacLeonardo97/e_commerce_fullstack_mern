import React, { useState, useEffect } from "react";

const CheckBox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([])

    //função para selecionar ou descelescionar a função
    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c) // it will return the first index of this category or will return -1 if not found
        const newCheckedCategoryId = [...checked] // if currently checked was not already in checked state we want to push in it, else, pull/take it off( dislick the button)
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }
    
  return (
      categories.map((c, i) => 
  <li key={i} className="list-unstyled categorias_box_1">
      <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" style={{fontSize:30}} />
      
      <label className="form-check-label" style={{fontSize:30}}>{c.name}</label>
  </li>
  ))
};

export default CheckBox;