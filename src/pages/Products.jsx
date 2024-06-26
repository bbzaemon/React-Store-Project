import { useEffect, useState, useReducer } from 'react';
import { Filters, PaginationContainer, ProductsContainer } from '../components';
import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import axios from 'axios';

// const url = '/products';
// export const loader = async ({ request }) => {
//   const params = Object.fromEntries([
//     ...new URL(request.url).searchParams.entries(), 
//   ]);
//   const kids = 'kids';
//   const response = await customFetch(`${url}?&category=${kids}`); // all products default URL 
//   // const response = await customFetch(url, { params });
//   const products = response.data.data;
//   const meta = response.data.meta;
//   // for (let i = 0; i < products.length; i++) {
//   //   const test  = [products[i].attributes].sort((a,b) => b.title - a.title)
//   //   console.log([products[i].attributes].sort((a,b) => b.title - a.title))
//   // }
//   return { products, meta, params };
// };


const Products = () => {
  // all values of form to be sort wihout calling API 
  let [ship,setShip] = useState(false)
  function checkp() {
    setShip(!ship)
  }
  const maxPrice = 100000;
  const resetBtn = () => {
    setCategory(category = 'all');
    setShip(ship = false);
    setCompany(company = 'all');
    setSort(sort = 'all');
    setSelectedPrice1(selectedPrice1 = maxPrice)
    setSearch('')
  }
  
  let [category, setCategory] = useState('all');
  const categoryChange = (event) => {
    setCategory(category = event.target.value);
    return category;
  };

  let [company, setCompany] = useState('all');
  const companyChange = (event) => {
    setCompany(company = event.target.value);
    return company;
  };

  let [sort, setSort] = useState('a-z');
  const sortChange = (event) => {
    setSort(sort = event.target.value);
    return sort;
  };


  let [selectedPrice1, setSelectedPrice1] = useState(maxPrice);
  const priceRange = (event) => {
    setSelectedPrice1(selectedPrice1 = event.target.value);
  };
  const priceObj = {
    priceRange : priceRange,
    selectedPrice: selectedPrice1
  }
  const [search,setSearch] = useState('');
  const forReset = {
    ship: ship,
    category: category,
    company: company,
    sort: sort,
    search: search
  }

  const [products, setProducts] = useState([]);
  const [meta,setMeta] = useState({
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 3,
      "total": 22
    },
    "categories": [
      "all",
      "Tables",
      "Chairs",
      "Kids",
      "Sofas",
      "Beds"
    ],
    "companies": [
      "all",
      "Modenza",
      "Luxora",
      "Artifex",
      "Comfora",
      "Homestead"
    ]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page1, setPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
    console.log(pageNumber)
  };
  useEffect(() => {
    setIsLoading(true);
     axios
       .get(`https://strapi-store-server.onrender.com/api/products?search=${search}&category=${category}&company=${company}&order=${sort}&price=${selectedPrice1}&page=${page1}`)
       .then((res) => {
         setProducts((prevState) => [...res.data.data]);
         setMeta((presvState) => res.data.meta);
         setIsLoading(false);
         return res.data.data,res.data.meta;
       })
       .catch((err) => {
         console.log(err);
         setIsLoading(false);
       });
   }, [category,company,sort,selectedPrice1,page1]);
  
  return (
    <>
      <Filters 
      filterstate={checkp} categoryState={categoryChange} 
      companyState={companyChange} priceState={priceObj} resetBtn={resetBtn}
      sortState={sortChange} searchState={setSearch}
       resetVal={forReset} meta={meta}
      />
      <ProductsContainer
       ship={ship}  categoryValue={category} 
       companyValue={company} selectedPrice={selectedPrice1}
       sortValue={sort} search={search} products={products} meta={meta}/>
      <PaginationContainer meta={meta} pageNum={handlePageChange}/>
    </>
  );
};
export default Products;