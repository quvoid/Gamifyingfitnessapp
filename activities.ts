import { supabase } from '../lib/supabase';

// Create a new activity
export const createActivity = async (userId: string, activityType: string, duration: number, pointsEarned: number) => {
    const { data, error } = await supabase
        .from('activities')
        .insert([{ user_id: userId, activity_type: activityType, duration, points_earned: pointsEarned }]);
    return { data, error };
};

// Get all activities
export const getActivities = async () => {
    const { data, error } = await supabase
        .from('activities')
        .select('*');
    return { data, error };
};

// Additional CRUD operations can be added here
