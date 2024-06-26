import { useLoaderData } from 'react-router-dom';
import { formatPrice, customFetch } from '../utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { SectionTitle } from '../components';

export const loader = async ({ params }) => {
  const response = await customFetch(`/products/${params.id}`);
    const { category } = response.data.data.attributes;
  const response1 = await customFetch(`/products/?category=${category}`);
  return { product: response.data.data , categoryProducts: response1.data.data};
};

const SingleProduct = () =>  {
  const { product,categoryProducts } = useLoaderData();
  // console.log(categoryProducts)
  const { image, title, price, description, colors, company} = product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const dispatch = useDispatch();
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
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
    <section>
      <div className='text-md breadcrumbs'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/products'>Products</Link>
          </li>
        </ul>
      </div>
      {/* PRODUCT */}
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16'>
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className='w-96 h-96 object-cover rounded-lg lg:w-full  '
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className='capitalize text-3xl font-bold'>{title}</h1>
          <h4 className='text-xl text-neutral-content font-bold mt-2'>
            {company}
          </h4>

          <p className='mt-3 text-xl'>{dollarsAmount}</p>

          <p className='mt-6 leading-8'>{description}</p>

          {/* COLORS */}
          <div className='mt-6'>
            <h4 className='text-md font-medium tracking-wider capitalize'>
              colors
            </h4>
            <div className='mt-2'>
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type='button'
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && 'border-2 border-secondary'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className='form-control w-full max-w-xs'>
            <label className='label'>
              <h4 className='text-md font-medium tracking-wider capitalize'>
                amount
              </h4>
            </label>
            <select
              className='select select-secondary select-bordered select-md'
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          {/* CART BUTTON */}
          <div className='mt-10 '>
            <button
              className='btn btn-secondary btn-md'
              onClick={addToCart}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
      
      <div className='pt-24 '>
      <SectionTitle text='Simmiliar products' />
      <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {categoryProducts.slice(2).map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = formatPrice(price);
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='card w-full shadow-xl hover:shadow-2xl transition duration-300'
          >
            <figure className='px-4 pt-4'>
              <img
                src={image}
                alt={title}
                className='rounded-xl h-64 md:h-48 w-full object-cover'
              />
            </figure>
            <div className='card-body items-center text-center'>
              <h2 className='card-title capitalize tracking-wider'>{title}</h2>
              <span className='text-secondary'>{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
    </div>
    </section>
  );
};
export default SingleProduct;