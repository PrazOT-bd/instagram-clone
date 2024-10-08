import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useShowToast from "./useShowToast";

const useExplorePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const showToast = useShowToast();

    // Fetches all users for exploration
    const fetchUsers = async () => {
        setIsLoading(true);
        setUsers([]);
        try {
            const q = query(collection(firestore, "users"));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) return showToast("Info", "No users found", "info");

            const fetchedUsers = [];
            querySnapshot.forEach((doc) => {
                fetchedUsers.push(doc.data());
            });
            setUsers(fetchedUsers);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Automatically fetch users when the hook is used
        fetchUsers();
    }, []);

    return { isLoading, users, fetchUsers };
};

export default useExplorePage;
