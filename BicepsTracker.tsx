import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { format } from 'date-fns';

const BicepsTracker: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [days, setDays] = useState<Array<{ date: string; target: number; completed: number }>>([]);
  const { user } = useAuthStore();

  const currentMonth = format(new Date(), 'MMMM yyyy');
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

  useEffect(() => {
    const fetchExerciseData = async () => {
      if (!user?.id) return;
      
      try {
        setLoading(true);
        
        // Get current month's data
        const { data, error } = await supabase
          .from('exercise_tracking')
          .select('*')
          .eq('user_id', user.id)
          .eq('exercise_type', 'biceps_curls')
          .gte('date', format(new Date(), 'yyyy-MM-01'))
          .lte('date', format(new Date(), 'yyyy-MM-31'));

        if (error) throw error;

        // Create days array with default values
        const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
          const date = format(new Date(new Date().getFullYear(), new Date().getMonth(), i + 1), 'yyyy-MM-dd');
          const existing = data?.find(d => d.date === date);
          return {
            date: format(new Date(date), 'd'),
            target: 20,
            completed: existing?.completed_reps || 0
          };
        });

        setDays(daysArray);
      } catch (error) {
        console.error('Error fetching exercise data:', error);
        setError('Failed to load exercise data');
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseData();
  }, [user?.id, daysInMonth]);

  const handleRepUpdate = async (dayIndex: number, reps: number) => {
    if (!user?.id) return;
    
    try {
      const date = format(new Date(new Date().getFullYear(), new Date().getMonth(), dayIndex + 1), 'yyyy-MM-dd');
      
      const { error } = await supabase
        .from('exercise_tracking')
        .upsert({
          user_id: user.id,
          exercise_type: 'biceps_curls',
          target_reps: 20,
          completed_reps: reps,
          date
        });

      if (error) throw error;

      setDays(prev => prev.map((d, i) => 
        i === dayIndex ? { ...d, completed: reps } : d
      ));
    } catch (error) {
      console.error('Error updating reps:', error);
      setError('Failed to update reps');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Biceps Curls Tracker - {currentMonth}</h1>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center font-medium mb-2">Day {day.date}</div>
            <div className="text-center text-sm text-gray-600 mb-2">
              Target: {day.target} reps
            </div>
            <input
              type="number"
              value={day.completed}
              onChange={(e) => handleRepUpdate(index, parseInt(e.target.value))}
              className="w-full px-2 py-1 border rounded text-center"
              min="0"
              max="100"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BicepsTracker;
