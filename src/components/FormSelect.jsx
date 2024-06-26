import { useState } from "react";

const FormSelect = ({ label, name, list, defaultValue, size, selectstate, reset }) => {
  
  let [categories, setSort] = useState(list);
  // let [reset,setReset] = useState(false);
  const resetBtn1 = () => {
    setSort(categories = list);
    setReset(true);
  };
  let [category, setCategory] = useState('all');
  const test = (event) => {
    selectstate(event)
    setCategory(category = event.target.value);
    // console.log(category)
    // return category;
  }
  
  // let [category, setCategory] = useState('all');
  // const categoryChange = (event) => {
  //   setCategory(category = event.target.value);
  //   selectstate(category)
  //   return category;    
  // };

    return (
      <div className='form-control'>
        <label htmlFor={name} className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <select
          name={name}
          id={name}
          className={`select select-bordered ${size}`}
          // defaultValue={defaultValue}
          value={defaultValue}
          onChange={test}
        >
          {list.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  export default FormSelect;