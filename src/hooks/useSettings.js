import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword as firebaseUpdatePassword } from "firebase/auth";
import { firestore, auth } from "../firebase/firebase"; // Ensure these are correctly imported
import useShowToast from "./useShowToast";

const useSettings = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();

    // Get the current user's ID from Firebase Auth
    const userId = auth.currentUser?.uid;

    // Fetch user settings from Firestore
    useEffect(() => {
        if (!userId) return;

        const fetchSettings = async () => {
            setLoading(true);
            try {
                const settingsRef = doc(firestore, "users", userId);
                const settingsDoc = await getDoc(settingsRef);
                if (settingsDoc.exists()) {
                    setSettings(settingsDoc.data());
                } else {
                    showToast("Error", "Settings not found", "error");
                }
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [userId, showToast]);

    // Toggle Account Privacy between Public and Private
    const toggleAccountPrivacy = async () => {
        if (!userId || !settings) return;

        try {
            const newAccountType = settings.accountType === "public" ? "private" : "public";
            await updateDoc(doc(firestore, "users", userId), { accountType: newAccountType });
            setSettings((prevSettings) => ({
                ...prevSettings,
                accountType: newAccountType,
            }));
            showToast("Success", `Account is now ${newAccountType}`, "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    // Toggle Notifications On/Off
    const toggleNotifications = async () => {
        if (!userId || !settings) return;

        try {
            const newNotificationStatus = !settings.notificationsEnabled;
            await updateDoc(doc(firestore, "users", userId), { notificationsEnabled: newNotificationStatus });
            setSettings((prevSettings) => ({
                ...prevSettings,
                notificationsEnabled: newNotificationStatus,
            }));
            showToast("Success", `Notifications ${newNotificationStatus ? "enabled" : "disabled"}`, "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    // Update User Password
    const updatePassword = async (currentPassword, newPassword) => {
        try {
            if (!auth.currentUser) {
                throw new Error("No authenticated user found.");
            }

            // Assuming re-authentication has been done elsewhere if necessary
            await firebaseUpdatePassword(auth.currentUser, newPassword);
            showToast("Success", "Password updated successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };

    return {
        settings,
        loading,
        toggleAccountPrivacy,
        toggleNotifications,
        updatePassword, // Expose this function for password updates
    };
};

export default useSettings;
