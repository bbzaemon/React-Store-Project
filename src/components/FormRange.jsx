import { formatPrice } from '../utils';
import { useState } from 'react';
const FormRange = ({ label, name, size, rangeState }) => {
  const step = 1000;
  const maxPrice = 100000;
  // const [selectedPrice, setSelectedPrice] = useState(defaultValue);
  // let selected = () => rangeState(e.target.value) const range = () => { rangeState(selectedPrice)} 
  // console.log(selected)  console.log(range)
  // console.log(selectedPrice)
  // rangeState(selectedPrice)
  return (
    <div className='form-control'>
      <label htmlFor={name} className='label cursor-pointer'>
        <span className='label-text capitalize'>{label}</span>
        <span>{formatPrice(rangeState.selectedPrice)}</span>
      </label>
      <input
        type='range'
        // name={name}
        min={0}
        max={maxPrice}
        value={rangeState.selectedPrice}
        onChange={(event) => rangeState.priceRange(event)}
        // onChange={(e) => rangeState(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />
      <div className='w-full flex justify-between text-xs px-2 mt-2'>
        <span className='font-bold text-md'>0</span>
        <span className='font-bold text-md'>Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};
export default FormRange;