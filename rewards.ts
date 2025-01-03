import { supabase } from '../lib/supabase';

// Create a new reward
export const createReward = async (name: string, description: string, pointsRequired: number) => {
    const { data, error } = await supabase
        .from('rewards')
        .insert([{ name, description, points_required: pointsRequired }]);
    return { data, error };
};

// Get all rewards
export const getRewards = async () => {
    const { data, error } = await supabase
        .from('rewards')
        .select('*');
    return { data, error };
};

// Additional CRUD operations can be added here
