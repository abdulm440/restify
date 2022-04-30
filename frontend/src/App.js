import NamedBlogPost from "./components/NamedBlogPost";
import BlogPost from "./components/BlogPost";
import Comment from "./components/Comment";
import ProfilePictureCard from "./components/ProfilePictureCard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import RestaurantCard from "./components/RestaurantCard";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import AddRestaurant from "./pages/AddRestaurant";
import EditRestaurant from "./pages/EditRestaurant";
import RestaurantProfile from "./pages/RestaurantProfile";
import SearchResults from "./pages/SearchResults";
import AuthService from "./services/auth.service";
import Login from "./pages/Login"
import Registration from "./pages/Registration";
import AddBlogPost from "./pages/AddBlogPost";
import AddComment from "./pages/AddComment";
import Notifs from './pages/Notifs'
function App() {
  return (
    <>
      <Navbar />
      {/* <RestaurantCard restaurant="Dominos" expenseMeter="1" stars={2}/> */}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/addRestaurant" element={<AddRestaurant />} />
          <Route path="/editRestaurant" element={<EditRestaurant />} />
          <Route path="/myRestaurant" element={<RestaurantProfile />} />
          <Route path="/search/:name" element={<SearchResults />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/addBlogPost" element={<AddBlogPost/>} />
          <Route path="/addComment" element={<AddComment/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/notifs" element={<Notifs/>} />
          <Route path="/restaurant/:id" element={<RestaurantProfile />} />
      </Routes>
      {/* <NamedBlogPost restaurant="Test" title="OOOO" content="NAAAA"/> */}
      {/* <BlogPost title="POGG" content="NO POG" /> */}
      {/* <Comment name="Joe Smith" rating="4.0" content="pog place" publishDate="A year ago" /> */}
      {/* <ProfilePictureCard assetURL="https://www.cdc.gov/coronavirus/2019-ncov/videos/how-to-interpret-self-test-results/How-to-Interpret-Self-Test-Results-Thumbnail.jpg?_=57985" /> */}
      <Footer />
    </>
  );
}

export default App;
