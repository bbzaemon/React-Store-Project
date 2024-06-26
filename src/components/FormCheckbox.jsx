import { useState } from "react";


const FormCheckbox = ({ name, label, size, checkp, defaultValue}) => {
    // const [checked, setChecked] = useState(true); 
    // const handleChange = () => { 
    //   setChecked(!checked); 
    //   console.log(checked)
    // }
    return (
      <div className='form-control items-center'>
        <label htmlFor={name} className='label cursor-pointer'>
          <span className='label-text capitalize'>{label}</span>
        </label>
        <input
          type='checkbox'
          // name={name}
          checked={defaultValue}
          defaultChecked={false}
          onChange={(event) => checkp(event)}
          id='shipping' 
          className={`checkbox checkbox-primary ${size}`}
        />
      </div>
    );
  };
  export default FormCheckbox;