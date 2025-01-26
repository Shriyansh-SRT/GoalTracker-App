// Example: Login Form
import { Input, Button, FormControl, FormLabel } from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <form onSubmit={handleLogin}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="blue" type="submit">
        Login
      </Button>
    </form>
  );
};