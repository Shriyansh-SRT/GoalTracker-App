import { useState } from 'react';
import { 
  Box, 
  Input, 
  Button, 
  Heading, 
  Text, 
  Link, 
  useToast 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const AuthForm = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const { login, signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = mode === 'login' 
      ? await login(email, password)
      : await signup(email, password);

    if (result.success) {
      toast({
        title: 'Success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Error',
        description: result.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={6} textAlign="center">
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Heading>
      
      <form onSubmit={handleSubmit}>
        <Input
          mb={4}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          mb={4}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button
          w="full"
          colorScheme="blue"
          type="submit"
          isLoading={isSubmitting}
        >
          {mode === 'login' ? 'Login' : 'Create Account'}
        </Button>
      </form>

      <Text mt={4} textAlign="center">
        {mode === 'login' ? (
          <>
            New user?{' '}
            <Link as={RouterLink} to="/signup" color="blue.500">
              Sign up here
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Login here
            </Link>
          </>
        )}
      </Text>
    </Box>
  );
};

export default AuthForm;