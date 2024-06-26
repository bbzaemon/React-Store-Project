import { ErrorElement } from './components';
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
  OrdersF
} from './pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { loader as landingLoader } from './pages/Landing';
// import ProductList from './components/ProductsList';
import { loader as singleLoader } from './pages/SingleProduct';
// import { loader as productsLoader} from './pages/Products';
import { action as loginAction } from './pages/Login';
import { store } from './store';
import { action as registerAction } from './pages/Register';
import { loader as checkoutLoader } from './pages/Checkout';
import { action as checkoutAction } from './components/CheckoutForm';
// import { loader as ordersLoader } from './pages/Orders';
import { loader as ordersLoader } from './pages/OrdersF';

import OrdersTest, { loader as ordersTestLoader } from './pages/OrdersTest';



const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    loader: landingLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'products',
        element: <Products/>,
        // loader: productsLoader,
        errorElement: ErrorElement,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader:singleLoader,
        errorElement:ErrorElement,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      { path: 'about',
       element: <About />
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),
      },
      {
        path: 'orders',
        element: <OrdersF />,
        loader: ordersLoader(store),
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <Error />,
    action:registerAction,
  },
]);

const App = () => {
  return(
    <RouterProvider router={router} />
  )
};
export default App;


/*
-- conditional view no 2 components but styling change
-- reset btn

-- color select on card
-- Z-A sort 
-- add to cart on card 
-- multiple field sort company, category
-- pagination 5 point page no not seen in url  
-- search without click for filters api call not be made 


-- free shipping API not call
-- Home about login user not
-- cart product to single producttitle="Anti-Hero"title="Taylor Swift"title="More actions"title="3:21"title="Cruel Summer"title="Taylor Swift"title="More actions"title="2:59"title="Flowers"Flowerstitle="Miley Cyrus"title="More actions"title="3:21"title="If Anything'stitle="Jamie Fine"title="More actions"title="2:55"title="bad idea righttitle="Explicit" ariatitle="Olivia Rodrigo"title="More actions"title="3:05"title="Save Your Tearstitle="The Weeknd &amptitle="More actions"title="3:12"title="Levitatingtitle="More actions"title="3:24"title="As It Was"title="Harry Styles"title="More actions"title="2:48"title="Eyes Closed"title="Ed Sheeran"title="More actions"title="3:15"title="Roar"title="Katy Perry"title="More actions"title="3:44"title="abcdefu"title="Explicit"title="GAYLE"title="More actions"title="2:49"title="You Need To"title="Taylor Swift"title="More actions"title="2:52"title="About Damn Time"title="Explicit" title="More actions"title="3:12"title="Bad Liar"title="Selena Gomez"title="More actions"title="3:35"title="she's all"title="Tate McRae"title="More actions"title="3:28"title="Bejeweled"Bejeweledtitle="Taylor Swift"title="More actions"title="3:15"title="The Middle"title="Zedd, Marentitle="More actions"title="3:05"title="Never Be thetitle="Camila Cabello"title="More actions"title="3:47"title="Hide Away"title="Daya"Dayatitle="More actions"title="3:12"title="Karma"Karmatitle="Explicit" ariatitle="Taylor Swift"title="More actions"title="3:25"title="Colors"Colorstitle="Halsey"Halseytitle="More actions"title="4:10"title="Unstoppable"Unstoppabletitle="Sia"Siatitle="More actions"title="3:38"title="2002"2002title="Anne-Marie"title="More actions"title="3:07"title="Scars To Yourtitle="Alessia Cara"title="More actions"title="3:51"title="good 4 utitle="Explicit" ariatitle="Olivia Rodrigo"title="More actions"title="2:59"title="Watermelon Sugar"title="Harry Styles"title="More actions"title="2:54"title="SNAP"SNAPtitle="Rosa Linn"title="More actions"title="3:00"title="Bad Blood"title="Taylor Swift"title="More actions"title="3:32"title="Dandelions"Dandelionstitle="Ruth B."title="More actions"title="3:54"title="Until I Foundtitle="Stephen Sanchez"title="More actions"title="2:57"title="Rolling in thetitle="Adele"Adeletitle="More actions"title="3:49"title="The Cure"title="Lady Gaga"title="More actions"title="3:32"title="Lose You totitle="Selena Gomez"title="More actions"title="3:27"title="Dance The Nighttitle="Dua Lipa"title="More actions"title="2:57"title="I Really Liketitle="Carly Rae Jepsentitle="More actions"title="3:25"title="Love Me Liketitle="Ellie Goulding"title="More actions"title="4:13"title="Kiss Me"title="Dermot Kennedy"title="More actions"title="3:50"title="IDGAF"IDGAFtitle="Explicit" ariatitle="Dua Lipa"title="More actions"title="3:38"title="Wonder"Wondertitle="Shawn Mendes"title="More actions"title="2:53"title="Back To Youtitle="Selena Gomez"title="More actions"title="3:31"title="Dance Monkey"title="Tones And Ititle="More actions"title="3:30"title="Don't Starttitle="Dua Lipa"title="More actions"title="3:04"title="Bad Blood"title="Taylor Swift"title="More actions"title="3:32"title="Thunder"Thundertitle="Imagine Dragons"title="More actions"title="3:08"title="Sweet but Psychotitle="Ava Max"title="More actions"title="3:08"title="SNAP"SNAPtitle="Rosa Linn"title="More actions"title="3:00"title="Dandelions"Dandelionstitle="Ruth B."title="More actions"title="3:54"title="Until I Foundtitle="Stephen Sanchez"title="More actions"title="2:57"title="Gorgeous"Gorgeoustitle="Taylor Swift"title="More actions"title="3:30"title="Lose You totitle="Selena Gomez"title="More actions"title="3:27"title="Cupid (Twin Vertitle="FIFTY FIFTY"title="More actions"title="2:55"title="Strangers"Strangerstitle="Kenya Grace"title="More actions"title="2:53"title="Wildest Dreams"title="Taylor Swift"title="More actions"title="3:41"title="Royals"Royalstitle="Lorde"Lordetitle="More actions"title="3:11"
*/
// title="Kooch Na Karin"
// title="Azhar Abbas"
// title="Kaise Ab Kahein [From Gutar Gu]
// title="Baari">Baari
// title="Saiyyan">Saiyyan
// title="Rang Lageya">Rang
// title="Rabb Manneya">Rabb
// title="Teri Hogaiyaan">Teri
// title="Saudebazi (Encore)">Saudebazi
// title="Maiyya Mainu"
// title="Ajj Din Chadheya"
// title="Ye Tune Kya Kiya"
// title="Dil Jaaniye"
// title="Sajde">
// title="Kinna Sona">
// title="Jaan 'Nisaar (Arijit)">
// title="Ishq Di Baajiyaan">
// title="Tere Bin">
// title="Sahiba"
// title="Ishq Tera">
// title="Dil Meri Na Sune
// title="Jogi">Jogi
// title="Nazm Nazm">Nazm
// title="Zara Zara">Zara
// title="O'Meri Laila">
// title="Teri Ore">Teri
// title="Maana Ke Hum Yaar
// title="Ishq Sufiyana (Male)">
// title="Tu Kisi Rail Si
// title="Naino Ne Baandhi">
// title="Aaj Se Teri">
// tittle="Rabba me to mar gaya"
// arrays are special objects in js  