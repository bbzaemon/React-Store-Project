import { useLoaderData } from 'react-router-dom';
import ProductsGrid from './ProductsGrid';
// import ProductsList from './ProductsList';
import { useState,useEffect } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';


const ProductsContainer = ({ ship, categoryValue, companyValue, search, sortValue, products, meta}) => {
  // const { meta } = useLoaderData();
  // let {totalProducts} = meta.pagination.total;
  const [layout, setLayout] = useState('grid');
  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? 'btn-primary text-primary-content'
        : 'btn-ghost text-base-content'
    }`;
  };
  
    // sort functions
  const sortCustom = () => {
    const title = (a, b) => a.attributes.title.toLowerCase() > b.attributes.title.toLowerCase() ? 1 : -1;
    const titleReverse = (a, b) => b.attributes.title.toLowerCase() > a.attributes.title.toLowerCase() ? 1 : -1;
    const low = (a, b) => a.attributes.price - b.attributes.price;
    const high = (a, b) => b.attributes.price - a.attributes.price;
     if (sortValue === 'z-a') {
      return titleReverse;
    } else if (sortValue === 'high') {
      return high;
    } else if (sortValue === 'low') {
      return low;
    } else{
    return title;
    }
  }

  const filteredProducts = (products.sort(sortCustom()))
  .filter(
    product => {
      return (
       (product.attributes.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        product.attributes.company
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        product.attributes.category
        .toLowerCase()
        .includes(search.toLowerCase())) &&
        (product.attributes.shipping || !ship) && 
        (categoryValue === product.attributes.category  || categoryValue === 'all') &&
        (companyValue === product.attributes.company || companyValue === 'all') 
      );
    }
  );


  return (
    <>
      {/* HEADER */}
      <div className='flex justify-between items-center mt-8 border-b border-base-300 pb-5'>
        <h4 className='font-medium text-md'>
          {filteredProducts.length} product{filteredProducts.length > 1 && 's'}
        </h4>
        <div className='flex gap-x-2'>
          <button
            onClick={() => setLayout('grid')}
            className={setActiveStyles('grid')}
          >
            <BsFillGridFill />
          </button>

          <button
            onClick={() => setLayout('list')}
            className={setActiveStyles('list')}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        {filteredProducts.length === 0 ? (
          <h5 className='text-2xl mt-16'>
            Sorry, no products matched your search...     
          </h5>
        ) : <ProductsGrid products={products} layout={layout}/> }        
      </div>
    </>
  );
};

export default ProductsContainer;