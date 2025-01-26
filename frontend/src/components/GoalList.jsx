import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Progress, Button } from "@chakra-ui/react";

const GoalList = () => {
  const [goals, setGoals] = useState([]);
  const { token } = useAuth(); // From AuthContext

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(res.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, [token]);

  return (
    <Box p={4}>
      <Heading mb={4}>Your Goals</Heading>
      {goals.map((goal) => (
        <Box key={goal._id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
          <Heading size="md">{goal.title}</Heading>
          <Progress value={goal.progress} mt={2} />
          <Button mt={2} colorScheme="red" size="sm">
            Delete
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default GoalList;