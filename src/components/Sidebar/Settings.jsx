import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Switch,
    Tooltip,
    useDisclosure,
    Text,
} from "@chakra-ui/react";
import useSettings from "../../hooks/useSettings";
import { useState } from "react";
import { SettingsLogo } from "../../assets/constants";

const Settings = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { settings, loading, toggleAccountPrivacy, updatePassword, toggleNotifications } = useSettings();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    if (loading) {
        return null; // Optional: Show loading spinner
    }

    if (!settings) {
        return <Text>No settings found.</Text>;
    }

    const handleChangePassword = () => {
        if (newPassword === confirmNewPassword) {
            updatePassword(currentPassword, newPassword);
        } else {
            alert("New password and confirmation do not match.");
        }
    };

    return (
        <>
            <Tooltip
                hasArrow
                label={"Settings"}
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
                    <SettingsLogo />
                    <Box display={{ base: "none", md: "block" }}>Settings</Box>
                </Flex>
            </Tooltip>

            <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        {/* Account Privacy */}
                        <Box mb={4}>
                            <FormLabel fontWeight="bold">Account Privacy</FormLabel>
                            <Text color="gray.500">Choose whether your account is public or private.</Text>
                            <Switch
                                mt={2}
                                isChecked={settings.accountType !== "private"} // Defaults to "Public"
                                onChange={toggleAccountPrivacy}
                            >
                                {settings.accountType !== "private" ? "Public" : "Private"}
                            </Switch>
                        </Box>

                        {/* Change Password */}
                        <Box mb={4}>
                            <FormLabel fontWeight="bold">Change Password</FormLabel>
                            <FormControl mb={4}>
                                <FormLabel>Current Password</FormLabel>
                                <Input
                                    placeholder="Current Password"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    placeholder="New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Confirm New Password</FormLabel>
                                <Input
                                    placeholder="Confirm New Password"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                            </FormControl>
                            <Flex w={"full"} justifyContent={"flex-end"}>
                                <Button
                                    onClick={handleChangePassword}
                                    ml={"auto"}
                                    size={"sm"}
                                    my={4}
                                >
                                    Change Password
                                </Button>
                            </Flex>
                        </Box>

                        {/* Notifications */}
                        <Box mb={4}>
                            <FormLabel fontWeight="bold">Notifications</FormLabel>
                            <Text color="gray.500">Enable or disable notifications.</Text>
                            <Switch
                                mt={2}
                                isChecked={settings.notificationsEnabled}
                                onChange={toggleNotifications}
                            >
                                {settings.notificationsEnabled ? "Enabled" : "Disabled"}
                            </Switch>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Settings;
