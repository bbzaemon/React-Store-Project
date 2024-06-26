import { useState } from "react";

const FormSelectCompany = ({ label, name, list, defaultValue, size, selectstate }) => {
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
          onChange={(event) => selectstate(event)}
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
  export default FormSelectCompany;