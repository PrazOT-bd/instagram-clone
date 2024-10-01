import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import Navbar from "../../components/Navbar/Navbar";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation()
    const [user, loading] = useAuthState(auth)
    const CanRenderSidebar = pathname !== "auth" && user;
    const canRenderNavbar = !user && !loading && pathname !== "/auth";

    const checkingUserIsAuth = !user && loading
    if (checkingUserIsAuth) return <PageLayoutSpinner />

    return (
        <Flex flexDir={canRenderNavbar ? "column" : "row"}>
            {/* sidebar */}
            {CanRenderSidebar ? (
                <Box w={{ base: "70px", md: "240px" }}>
                    <Sidebar />
                </Box>
            ) : null}

            {/* navbar  */}
            {canRenderNavbar ? <Navbar /> : null}

            {/* content  */}
            <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px" }} mx={"auto"}>
                {children}
            </Box>

        </Flex>
    )
}

export default PageLayout;

const PageLayoutSpinner = () => {
    return (
        <Flex flexDir='column' justifyContent={"center"} alignItems={"center"} h={"100vh"}>
            <Spinner size={"xl"} />
        </Flex>
    )
}