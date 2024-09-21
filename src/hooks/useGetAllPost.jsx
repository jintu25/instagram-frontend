import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/post/allpost", { withCredentials: true }); // Make sure the route matches your backend
                if (res.data.success) {
                    console.log(res.data);
                    // Dispatch to Redux or set state here
                    dispatch(setPosts(res.data.posts))
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllPost();
    }, [dispatch]);
};

export default useGetAllPost;
