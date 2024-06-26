import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch } from '../utils';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

const ProductsGrid = ({products, layout}) => {
  // const { products } = useLoaderData(); 
  // add to cart
  const dispatch = useDispatch();

  // filter & search 
  const [searchShow, setSearchShow] = useState(true); 

  function SearchList() {
    if (searchShow) {
      return (
        <div className=
        {`${layout === 'grid'  ? 'pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'mt-12 grid gap-y-8'}`}>
        {
          products.map((product, index) => {
            const { title, price, image, shipping, category, company , colors, description} = product.attributes;    
            const{ id } = product;       
            const amount = 1;
            const [productColor, setProductColor] = useState(colors[0]);
            const dollarsAmount = formatPrice(price);  
            const cartProduct = {
              cartID: id + productColor,
              productID: id,
              image,
              title,
              price,
              amount,
              productColor,
              company,
            };
            const addToCart = () => {
              dispatch(addItem({ product: cartProduct }));
            }; 
                return (
                  <div className={`shadow-xl hover:shadow-2xl transition duration-300 rounded-lg 
                        ${layout === 'grid'  ? 'grid-view' : 'list-view'}`} key={index}>
                    <Link key={product.id} to={`/products/${product.id}`}
                      className='link-class'>
                      <figure className='figure'>
                        <img
                          src={image}
                          alt={title}
                        />
                      </figure>
                      <div className='details'>
                        <h2>{title}</h2>
                        <h4>{company}</h4>
                        <p className='text-secondary'>{dollarsAmount}</p>
                        <span className='max-w-xs description'> 
                        {description.length > 250 ?
                            `${description.substring(0, 100)}...` : item.description}
                        </span>
                      </div>
                    </Link>
                    <div className='color-bag'>
                    <div className='text-center'>
                  {colors.map((color) => {
                    return (
                      <button
                        key={color}
                        type='button'
                        className={`badge  w-6 h-6 mr-2  ${
                          color === productColor && 'border-3 border-secondary'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setProductColor(color)}
                      ></button>
                    );
                  })}
                </div>
                    <button className='btn btn-secondary g-btn' onClick={addToCart}>
                          Add to bag
                    </button>
                    </div>
                </div>
              );
          })
        }
      </div>
      );
    }
  }
  return (
    // searchList()
    <SearchList/> 
  );

};
export default ProductsGrid;


// conditional rendering logic
  // if(shipping || !shippingstate){ return (
  // if(shipping || shippingstate){ return (
  // if(shipping && shippingstate){ return (

  {/* {console.log(totalProductsShowing)} */}

  // let sortable = [];
  //   for (var vehicle in products) {
  //       sortable.push([vehicle, products[vehicle]]);
  //   }
  // console.log(sortable)
          // console.log(company)
        // const sortable = Object.fromEntries(
        //   Object.entries(product.attributes).sort(([,a],[,b]) => b-a));

            //   sortable.sort(function(a, b) {
            //     return b[1] - a[1];
            // });
                // <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 '>
    //   {products.map((product) => {
    //     const { title, price, image, shipping, category, company} = product.attributes;           
    //     const dollarsAmount = formatPrice(price);  
    //     // var byName = products.slice(0);
    //     //     byName.sort(function(a,b) {
    //     //       var x = a.name
    //     //       var y = b.name
    //     //         return x < y ? -1 : x > y ? 1 : 0;
    //     //     });
    //     //     console.log('by name:');
    //     //     console.log(byName);   
    //     // console.log(product)
    //     // var byName = products.slice(0);
    //     // byName.sort(function(a,b) {
    //     //   return b.attributes.title - a.attributes.title;
    //     // });
    //     // console.log('by date:');
    //     // console.log(byName);  
    //     if((shipping || !shippingstate) && 
    //        (catshort === category  || catshort === 'all') &&
    //        (companySelected === company || companySelected === 'all') &&
    //        (price <= priceRange) && 
    //        (title == search || title === ''))
    //        {
    //         let count = products;
    //         // console.log(priceRange) to debug 1000
    //         // console.log(products.length)
    //         // let totalProductsShowing = 10;
    //        return (
    //           <Link
    //             key={product.id}
    //             to={`/products/${product.id}`}
    //             className='card w-full  shadow-xl hover:shadow-2xl transition duration-300 '
    //           >
    //             <figure className='px-4 pt-4'>
    //               <img
    //                 src={image}
    //                 alt={title}
    //                 className='rounded-xl h-64 md:h-48 w-full object-cover'
    //               />
    //             </figure>
    //             <div className='card-body items-center text-center'>
    //               <h2 className='card-title capitalize tracking-wider'>{title}</h2>
    //               <span className='text-secondary'>{dollarsAmount}</span>
    //             </div>
    //           </Link>
    //     );}
 
    //   })}
    // </div>