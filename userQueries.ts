import { supabase } from '../lib/supabase';

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) throw error;
  return data;
};

export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  
  if (error) throw error;
  return data || null;
};

export const getUsersByPoints = async (minPoints: number) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .gte('points', minPoints);
  
  if (error) throw error;
  return data;
};
