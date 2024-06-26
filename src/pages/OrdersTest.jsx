import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { ComplexPaginationContainer, OrdersList, SectionTitle } from '../components';


// pagination
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export const loader = (store) => async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must be logged in to view orders');
      return redirect('/login');
    }
    // console.log('t',params)
    try {
    //   const params = Object.fromEntries([
    //     ...new URL(request.url).searchParams.entries(),
    //   ]); 
    // let params = 10;
      const handlePageChange = (pageNumber = 1) => {
        // const searchParams = new URLSearchParams(search);
        // const test = searchParams.set('page', pageNumber);
        // let params;
        // params += pageNumber;
        // console.log(params)
        console.log(pageNumber)
        return pageNumber;
      //   navigate(`${pathname}?${searchParams.toString()}`);
      // console.log(`${pathname}?${searchParams.toString()}`)
      }; 
      // const [page, setPage] = useState(1);

      const response = await customFetch.get(`/orders?page=${handlePageChange()}`, {
          headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // console.log(params.page)
      return { orders: response.data.data, meta: response.data.meta, handlePageChange};
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        'there was an error accessing your orders';
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect('/login');
      return null;
    }
  };
  const OrdersTest = () => {
    const { meta, orders, handlePageChange } = useLoaderData();
    // console.log(orders.length)
    if (meta.pagination.total < 1) {
      return <SectionTitle text='Please make an order' />;
    }

    // ************************************************************** //
    // pagination
    const { pageCount, page } = meta.pagination;
    const { search, pathname } = useLocation();
    // console.log('page', search, 'path', pathname)
    const navigate = useNavigate();
    // handle change func
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
                onClick={() => { let prevPage = page -2; handlePageChange(prevPage);}}        >
             {page - 2}
            </button>
            <button className='btn btn-xs sm:btn-md join-item'
                onClick={() => { let prevPage = page -1; handlePageChange(prevPage);}}        >
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
        <SectionTitle text='Your Orders' />
        <OrdersList />
        {/* <ComplexPaginationContainer /> */}
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
    );
  };
  export default OrdersTest;