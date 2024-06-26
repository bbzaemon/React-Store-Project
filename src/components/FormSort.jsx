import { useState } from "react";

const FormSort = ({ label, name, list, defaultValue, size, sortInput }) => {

    return (
      <div className='form-control'>
        <label htmlFor={name} className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <select
          // name={name}
          id={name}
          className={`select select-bordered ${size}`}
          value={defaultValue}
          onChange={ () => sortInput(event)}
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
  export default FormSort;