import { Box, Container, Flex, Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react'
import FeedPost from './FeedPost'
import { useEffect, useState } from 'react';


const FeedPosts = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <Container maxW={"container.sm"} py={10} px={2}>
            {isLoading && [0, 1, 2, 3].map((_, idx) => (
                <VStack spacing={4} alignItems={"flex-start"} key={idx} gap={4} mb={10}>
                    <Flex>
                        <SkeletonCircle size='10' />
                        <VStack gap={2} alignItems={"flex-start"}>
                            <SkeletonCircle height='10px' w={"200px"} />
                            <SkeletonCircle height='10px' w={"200px"} />
                        </VStack>
                    </Flex>
                    <Skeleton w={"full"}>
                        <Box h={"500px"}>contents wrapped</Box>
                    </Skeleton>

                </VStack>
            ))}
            {!isLoading && (
                <>
                    <FeedPost img='/img1.png' username='perry' avatar='/img1.png' />
                    <FeedPost img='/img2.png' username='JohnDoe' avatar='/img2.png' />
                    <FeedPost img='/img3.png' username='Jane' avatar='/img3.png' />
                    <FeedPost img='/img4.png' username='peezzy' avatar='/img4.png' />
                </>
            )}

        </Container>
    );
};

export default FeedPosts;
