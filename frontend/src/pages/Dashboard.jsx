import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Button,
  Stack,
  Text,
  useDisclosure,
  IconButton,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';
import CreateGoalModal from '../components/CreateGoalModal';
import useAuth from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [goals, setGoals] = useState([]);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/goals', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGoals(res.data);
      } catch (err) {
        setError('Failed to fetch goals');
      }
    };
    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGoals(goals.filter(goal => goal._id !== id));
    } catch (err) {
      setError('Failed to delete goal');
    }
  };

  return (
    <Box p={8} maxW="xl" mx="auto">
      <Box display="flex" justifyContent="space-between" mb={8}>
        <Heading>Your Goals</Heading>
        <Button colorScheme="blue" onClick={onOpen}>
          New Goal
        </Button>
      </Box>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <Stack spacing={4}>
        {goals.map(goal => (
          <Box
            key={goal._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Heading size="md">{goal.title}</Heading>
              <Text mt={2}>{goal.description}</Text>
              <Text fontSize="sm" color="gray.500" mt={2}>
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </Text>
            </Box>
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete goal"
              colorScheme="red"
              onClick={() => handleDelete(goal._id)}
            />
          </Box>
        ))}
      </Stack>

      <CreateGoalModal isOpen={isOpen} onClose={onClose} setGoals={setGoals} />
    </Box>
  );
};

export default Dashboard;