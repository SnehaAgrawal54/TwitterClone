import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUser } from "../redux/userSlice";

const useGetOtherUser = (id) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUser = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/otheruser/${id}`, {
                    withCredentials: true
                });
                console.log(res);
                dispatch(getOtherUser(res.data.otherUser));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUser();
    }, []);
    
};
export default useGetOtherUser;