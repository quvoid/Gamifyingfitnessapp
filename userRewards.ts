import { supabase } from '../lib/supabase';

// Create a new user reward
export const createUserReward = async (userId: string, rewardId: string) => {
    const { data, error } = await supabase
        .from('user_rewards')
        .insert([{ user_id: userId, reward_id: rewardId }]);
    return { data, error };
};

// Get all user rewards
export const getUserRewards = async () => {
    const { data, error } = await supabase
        .from('user_rewards')
        .select('*');
    return { data, error };
};

// Additional CRUD operations can be added here
