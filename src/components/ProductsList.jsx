import { formatPrice } from '../utils';
import { Link, useLoaderData } from 'react-router-dom';

const ProductList = ({shippingstate}) => {
  const { products } = useLoaderData();
  let colors = ["#FF5733", "#33FF57", "#3366FF"];
  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        const { title, price, image, shipping, company, description } = product.attributes;
        const dollarsAmount = formatPrice(price);
        if(shipping || !shippingstate){
        return (
          <div className='list-view group p-8 flex flex-col sm:flex-row gap-y-4 justify-between' >
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='link-class'
          >
          <figure className=''>
            <img
              src={image}
              alt={title}
              className=''
            />
          </figure>
            <div className='ml-0 sm:ml-12'>
              <h3 className='capitalize font-medium text-lg'>{title}</h3>
              <h4 className='capitalize text-md text-neutral-content'>
                {company}
              </h4>
              <p className='font-medium ml-0 sm:ml-auto text-lg'>
              {dollarsAmount}
            </p>
            <span className='max-w-xs'>  {description.length > 250 ?
    `${description.substring(0, 100)}...` : item.description
  }</span>
            </div>
            </Link>

            <div className='basis-1/5 text-center m-auto'>
                <div className='text-center'>
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type='button'
                    className={`badge  w-5 h-5 mr-2 'border-3 border-secondary'
                    `}
                    style={{ backgroundColor: color }}
                    // onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
                <button className='btn btn-secondary btn-sm m-2' onClick={() =>console.log(test)}>
                      Add to bag
                </button>
                </div>
          </div>
        );}
      })}
    </div>
  );
};

export default ProductList;