// import { redirect, useLoaderData } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { customFetch } from '../utils';
// import { ComplexPaginationContainer, OrdersList, SectionTitle } from '../components';
import { redirect } from 'react-router-dom';

import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
import { useState,useEffect } from 'react';
import axios from 'axios';

export const loader = (store) => async ({ request }) => {
    const user = store.getState().userState.user;
  
    if (!user) {
      toast.warn('You must be logged in to view orders');
      return redirect('/login');
    }
      return { user };

  };
  const OrdersF = () => {
    const { user } = useLoaderData();

    const [orders, setOrders] = useState([]);
    const [meta,setMeta] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    let [page1, setPage] = useState(1);
    const handlePageChange = (pageNumber) => {
      setPage(pageNumber)
    };

    useEffect(() => {
     setIsLoading(true);
      axios
        .get(
          `https://strapi-store-server.onrender.com/api/orders?page=${page1}`,{
            headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          setOrders((prevState) => [...res.data.data]);
          setMeta((presvState) => res.data.meta.pagination);
          // console.log(meta)
          setIsLoading(false);
          return res.data.data,res.data.meta.pagination;
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }, [page1]);
    // console.log(page1)
    // useEffect(() => {
    //   const endOffset = imagesOffset + 10;
    //   setCurrentImages(orders.slice(imagesOffset, endOffset));
    //   setPageCount(Math.ceil(orders.length / 10));
    // }, [orders, imagesOffset]);
    console.log(meta)
      let { page, pageCount } = meta;

    // const handlePageClick = (event) => {
    //     // const newOffset = (event.selected * 10) % orders.length;
    //     // setImagesOffset(newOffset);
    //     setOrders(pageCount+1) 
    // };

    const addPageButton = ({ pageNumber, activeClass }) => {
      return (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`btn btn-xs sm:btn-md border-none join-item ${
            activeClass ? 'bg-base-300 border-base-300 ' : ''
          }`}
        >
          {pageNumber}
        </button>
      );
    };
  
    const renderPageButtons = () => {
      const pageButtons = [];
      if (page > 2) {
          {/* Before 2 Pages */}
          pageButtons.push(<>
          <button className='btn btn-xs sm:btn-md join-item'
              onClick={() => { let prevPage = page - 2; handlePageChange(prevPage);}}        >
           {page - 2}
          </button>
          <button className='btn btn-xs sm:btn-md join-item'
              onClick={() => { let prevPage = page - 1; handlePageChange(prevPage);}}        >
           {page - 1}
          </button></>)
      }
  
      // active/current page
      if (page) {   
        pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
      } 
      if (page < pageCount-2) {      
          {/* Before 2 Pages */}
          pageButtons.push(<>
            {/* Next 2 Page */}
            <button className='btn btn-xs sm:btn-md join-item' 
            onClick={() => {
              let nextPage = page + 1;
              // if (nextPage > pageCount) nextPage = 1;
              handlePageChange(nextPage);
            }}
          >
            {page + 1}
          </button>
          <button className='btn btn-xs sm:btn-md join-item' 
            onClick={() => {
              let nextPage = page + 2;
              // if (nextPage > pageCount) nextPage = 1;
              handlePageChange(nextPage);
            }}
          >
            {page + 2}
          </button></>)
      }
      return pageButtons;
    };
  
    if (pageCount < 2) return null;

    return (
      <>
      <div className='mt-8'>
      {/* <h4 className='mb-4 capitalize'>
        total orders : {meta.pagination.total}
      </h4> */}
      <div className='overflow-x-auto '>
        <table className='table table-zebra'>
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Products</th>
              <th>Cost</th>
              <th className='hidden sm:block'>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const id = order.id;
              const { name, address, numItemsInCart, orderTotal, createdAt } =
                order.attributes;

              const date = day(createdAt).format('hh:mm a - MMM Do, YYYY ');
              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{address}</td>
                  <td>{numItemsInCart}</td>
                  <td>{orderTotal}</td>
                  <td className='hidden sm:block'>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

     <div className='mt-16 flex justify-end'>
      <div className='join'>
      {/* First Page */}
      <button className='btn btn-xs sm:btn-md join-item'
          onClick={() => {handlePageChange(1);}}>
          {'<<'}
        </button>

        <button className='btn btn-xs sm:btn-md join-item'
            onClick={() => { let prevPage = page - 1; if (prevPage < 1) prevPage = pageCount;
             handlePageChange(prevPage);}}        >
         Previous
        </button>

        {renderPageButtons()}

        {/* Next Page  */}
        <button className='btn btn-xs sm:btn-md join-item' 
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>

        {/* Last Page */}
        <button className='btn btn-xs sm:btn-md join-item'
          onClick={() => {handlePageChange(pageCount);}}>
          {'>>'}
        </button>
      </div>
    </div>
    </>
    )
  };
  export default OrdersF;