import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta.pagination;
  
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  
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
  );
};
export default ComplexPaginationContainer;