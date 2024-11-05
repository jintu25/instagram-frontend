import { setSuggestedUsers } from "@/redux/authSlice";
import { USER_API } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSuggestedUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get(`${USER_API}/user/suggested`, { withCredentials: true }); // Make sure the route matches your backend
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
