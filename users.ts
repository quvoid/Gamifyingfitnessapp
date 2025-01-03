import { supabase } from '../lib/supabase';

// Create a new user
export const createUser = async (email: string, fullName: string, username: string) => {
    const { data, error } = await supabase
        .from('users')
        .insert([{ email, full_name: fullName, username }]);
    return { data, error };
};

// New endpoint to fetch users table schema
export const getUsersTableSchema = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(1); // Fetch one record to infer the schema
    return { data, error };
};

// Get all users
export const getUsers = async () => {
    const { data, error } = await supabase
        .from('users')
        .select('*');
    return { data, error };
};
