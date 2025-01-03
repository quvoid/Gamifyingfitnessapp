import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Stats {
  stamina: number;
  versatility: number;
  endurance: number;
  agility: number;
  strength: number;
}

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    stamina: 0,
    versatility: 0,
    endurance: 0,
    agility: 0,
    strength: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .single();
      
      if (error) throw error;
      if (data) {
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateStat = async (stat: keyof Stats, value: number) => {
    try {
      const { error } = await supabase
        .from('user_stats')
        .update({ [stat]: value })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      
      if (error) throw error;
      setStats(prev => ({ ...prev, [stat]: value }));
    } catch (error) {
      console.error('Error updating stat:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-800 mb-8">Your Stats</h1>
        <div className="space-y-6">
          {Object.entries(stats).map(([stat, value]) => (
            <div key={stat}>
              <div className="flex justify-between mb-1">
                <span className="text-lg font-medium text-gray-700 capitalize">
                  {stat}
                </span>
                <span className="text-lg font-medium text-gray-700">
                  {value}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${
                    stat === 'stamina' ? 'bg-green-500' :
                    stat === 'versatility' ? 'bg-blue-500' :
                    stat === 'endurance' ? 'bg-purple-500' :
                    stat === 'agility' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} 
                  style={{ width: `${value}%` }}
                ></div>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => updateStat(stat as keyof Stats, Math.min(100, value + 5))}
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
