import {
    Box,
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ExploreLogo } from "../../assets/constants";
import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import FeedPosts from "../FeedPosts/FeedPosts";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth import
import { useNavigate } from "react-router-dom"; // If using react-router for navigation

const Explore = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { posts } = useGetFeedPosts();
    const [postCount, setPostCount] = useState(8);  // Start by showing 8 posts
    const [activeTab, setActiveTab] = useState('posts'); // Default to 'posts' since users tab is removed
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    // Firebase auth instance
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true); // User is authenticated
            } else {
                setAuthenticated(false);
                navigate("/login"); // Redirect to login if not authenticated
            }
        });

        // Cleanup the listener when component unmounts
        return () => unsubscribe();
    }, [auth, navigate]);

    // Load more functionality for posts
    const loadMorePosts = () => {
        setPostCount(prev => prev + 8); // Load 8 more posts
    };

    if (!authenticated) {
        return <Box>Loading...</Box>; // Loading state while checking authentication
    }

    return (
        <>
            <Tooltip
                hasArrow
                label={"Explore"}
                placement='right'
                ml={1}
                openDelay={500}
                display={{ base: "block", md: "none" }}
            >
                <Flex
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                    onClick={onOpen}
                >
                    <ExploreLogo />
                    <Box display={{ base: "none", md: "block" }}>Explore</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"} maxW={"500px"}>
                    <ModalHeader>
                        <Flex justifyContent="center">
                            <Button
                                variant="ghost"
                                color={activeTab === 'posts' ? 'white' : 'gray.500'}
                                onClick={() => setActiveTab('posts')}
                            >
                                Posts
                            </Button>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Box>
                            <Box fontWeight="bold" mb={4}>
                                Explore Posts
                            </Box>
                            {posts.length === 0 ? (
                                <Box>Loading...</Box>
                            ) : (
                                <>
                                    {posts.slice(0, postCount).map((post, index) => (
                                        <FeedPosts key={post.id || `post-${index}`} user={post} />
                                    ))}
                                    {postCount < posts.length && (
                                        <Button onClick={loadMorePosts} mt={4} w="full">
                                            Load More Posts
                                        </Button>
                                    )}
                                </>
                            )}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Explore;
