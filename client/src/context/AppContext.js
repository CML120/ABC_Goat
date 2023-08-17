import { createContext, useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PLAYER_LEVEL } from "../utils/mutations";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "", // Set initial username
    level: ""     // Set initial level
  });


  const [updatePlayerLevelMutation] = useMutation(UPDATE_PLAYER_LEVEL); // Initialize the mutation hook

  const updateUserLevel = async (newLevel) => {
    try {
      const { data } = await updatePlayerLevelMutation({
        variables: { userId: user._id, newLevel } // Pass the user's ID and newLevel to the mutation
      });

      // Update the context's user state with the updated level
      setUser(prevUser => ({
        ...prevUser,
        level: data.updatePlayerLevel.level
      }));
    } catch (error) {
      console.error("Error updating player level:", error);
    }
  };

  const value = {
    user,
    setUser,
    updateUserLevel
  };

  


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
