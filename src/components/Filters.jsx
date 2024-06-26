import { Form, useLoaderData, Link } from 'react-router-dom';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormRange from './FormRange';
import FormCheckbox from './FormCheckbox';
import FormSelectCompany from './FormSelectCompany';
import FormSort from './FormSort';
import { useEffect, useReducer, useState } from 'react';

const Filters = ({ filterstate, categoryState, sortState, priceState, companyState, searchState, resetBtn, categoryVal, resetVal, meta}) => {
  
  // const { meta, params} = useLoaderData();
  // const { search, company, category, order, price } = params;
  let [reset, setReset] = useState(false);
  // const resetBtn1 = () => {
  //   setSort(categories = ['all', 'Chairs']);
  //   setReset(reset = true)
  //   return categories;
  //   // return sort;
  // }; 
// console.log(category) 
// let [category1, setCategory] = useState('all');
// const test = (event) => {
//   categoryState(event)
//   setCategory(category1 = event.target.value);
//   console.log(category1)
//   return category1;
// }
//   const resetBtn1 = () => {
//     setCategory(category1 = 'all');
//     categoryState(category1)
//     // setReset(reset = true)
//     return category1;
//   }; 
  return (
    <div className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center'>
      {/* SEARCH */}
      <FormInput type='search' label='search product' name='search'
       defaultValue={resetVal.search} size='input-sm' searchStateInput={searchState} />
      
    {/* CATEGORIES */}
      <FormSelect
        label='select category'
        name='category'
        list={meta.categories}
        defaultValue={resetVal.category}
        reset={reset}
        selectstate={categoryState}
        size='select-sm'
      />
      {/* <div className='form-control'>
        <label htmlFor='category' className='label'>
          <span className='label-text capitalize'>select category</span>
        </label>
        <select
          name='category'
          id='category'
          className={`select select-bordered select-sm`}
          value={categoryVal}
          onChange={categoryState}
        >
          {meta.categories.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div> */}
      {/* COMPANIES */}
      <FormSelectCompany
        label='select company'
        name='company'
        list={meta.companies}
        defaultValue={resetVal.company}
        selectstate={companyState}
        size='select-sm'
      />
      {/* ORDER */}
      <FormSort
        label='sort by'
        name='order'
        list={['a-z', 'z-a', 'high', 'low']}
        defaultValue={resetVal.sort}
        sortInput={sortState}
        size='select-sm'
      />
      {/* PRICE */}
      <FormRange label='select price' name='price' size='range-sm'
          rangeState={priceState}
          defaultValue={resetVal.price} />
      {/* SHIPPING */}
      <FormCheckbox label='free shipping' size='checkbox-sm'
       defaultValue={resetVal.ship}
        checkp={() => filterstate()}/>
      {/* BUTTONS */}
      <button type='submit' className='btn btn-primary btn-sm '>
        search
      </button>
      <button onClick={resetBtn} className='btn btn-accent btn-sm'>
        reset
      </button>
    </div>
  );
};
export default Filters;


  // const [ship,setShip] = useState(true)
  // function checkp() {
  //   setShip(!ship)
  //   console.log(ship)
  // }
  // const [checked, setChecked] = useState(true); 
  // const handleChange = () => { 
  //   setChecked(!checked); 
  //   console.log(checked)
  // }