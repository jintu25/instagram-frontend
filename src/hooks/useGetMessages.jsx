import { setMessages } from "@/redux/chatSlice";
import { USER_API } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useGetMessages
    = () => {
        const { selectedUser } = useSelector(store => store.auth)
        const dispatch = useDispatch();

        useEffect(() => {
            const fetchMessages = async () => {
                try {
                    const res = await axios.get(`${USER_API}/message/all/${selectedUser?._id}`, { withCredentials: true });
                    // Make sure the route matches your backend
                    console.log(res.data)
                    if (res.data.success) {
                        dispatch(setMessages(res.data.messages))
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchMessages();
        }, [selectedUser]);
    };

export default useGetMessages
