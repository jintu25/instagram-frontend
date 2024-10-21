import { setSuggestedUsers } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSuggestedUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/user/suggested", { withCredentials: true }); // Make sure the route matches your backend
                console.log(res)
                if (res.data.success) {
                    dispatch(setSuggestedUsers(res.data.users))
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSuggestedUsers();
    }, [dispatch]);
};

export default useSuggestedUsers;
