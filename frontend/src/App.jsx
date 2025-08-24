import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/auth/signup";
import LogInPage from "./pages/auth/login";
import Home from "./pages/user/Home";
import { Toaster } from "@/components/ui/sonner";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Aboutus from "./pages/user/Aboutus";
import Blogs from "./pages/user/Blogs";
import Blog from "./pages/user/Blog";
import Services from "./pages/user/Services";
import ContactUs from "./pages/user/Contactus";
import Cart from "./pages/user/Cart";
import BlogWriter from "./pages/admin/AddBlog";
import EditBlog from "./pages/admin/EditBlog";
import UserProfile from "./pages/user/Profile";
import { useGetMeQuery } from '@/apis/authApi';
import { useGetBlogsQuery } from '@/apis/blogApi'
import { useGetMessagesQuery } from "@/apis/messageApi"

function App() {
  useGetMeQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: blogs } = useGetBlogsQuery();
  const { data: messages } = useGetMessagesQuery();
  return (
    <Router>
      <Toaster richColors position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/blogs" element={<Blogs blogs={blogs} />} />
        <Route path="/blog/:id" element={<Blog blogs={blogs} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/add-blog" element={<BlogWriter />} />
        <Route path="/admin/edit-blog/:slug" element={<EditBlog />} />
        <Route path="/profile" element={<UserProfile messages={messages} />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
