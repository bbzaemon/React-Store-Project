import { useState } from "react";

const FormInput = ({ label, name, type, defaultValue, size, searchStateInput}) => {

  const [input,setInput] = useState('')
  const test = () =>{
  searchStateInput(input)}
    return (
      <div className='form-control '>
        <label className='label'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <input
          type={type}
          name={name}
          onChange={(e) => searchStateInput(e.target.value)}
          value={defaultValue}
          className={`input input-bordered ${size}`}
        />
      </div>
    );
  };
  export default FormInput;