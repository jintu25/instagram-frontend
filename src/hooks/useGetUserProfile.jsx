import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserProfile } from "@/redux/authSlice";
import { USER_API } from "@/utils/constant";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    const [userProfile, setUserProfileState] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${USER_API}/user/${userId}/profile`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    setUserProfileState(res.data.user);
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        }
    }, [userId, dispatch]);

    // Return the necessary data for the component
    return { userProfile, loading };
};

export default useGetUserProfile;
