import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  HStack
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(
        e.target.name.value,
        e.target.email.value,
        password
      );
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/home");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <Box w="full" py={4} px={24} mx="auto" mt={8} align={'center'}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Register
      </Text>

      <Box w={'50%'} borderWidth="1px" borderRadius="lg" p={4} shadow={'base'}>
        <form onSubmit={handleSubmit}>
          {error && (
            <Box color="red.500" mb={4}>
              {error}
            </Box>
          )}
          
          <HStack>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input variant={'flushed'} focusBorderColor={'teal.400'} type="name" name="name" placeholder="Enter your mame" />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                variant={'flushed'} focusBorderColor={'teal.400'}
              />
            </FormControl>
          </HStack>

          <HStack mt={5}>
            <FormControl isRequired >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant={'flushed'} focusBorderColor={'teal.400'}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant={'flushed'} focusBorderColor={'teal.400'}
              />
              {password !== confirmPassword && (
                <Text fontSize="xs" color="red.500">
                  The password does not match
                </Text>
              )}
            </FormControl>
          </HStack>

          <Button mt={6} colorScheme="teal" type="submit">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
