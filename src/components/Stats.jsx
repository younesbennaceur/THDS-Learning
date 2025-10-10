import React from 'react';
import { Star, Users, Clock } from 'lucide-react';


export default function Stats() {
  const stats = [
    {
      icon: Star,
      number: "à venir",
      label: "Taux de satisfaction extrait de edof pour nos actions de formation",
      color: "text-orange-500"
    },
    {
      icon: Users,
      number: "50",
      label: "Stagiaires formés 2025",
      color: "text-purple-600"
    },
    {
      icon: Clock,
      number: "à venir",
      label: "heures de formations dispensées",
      color: "text-purple-600"
    }
  ];

  const topFormations = [
    { name: "Excel", percentage: 75 },
    { name: "Création Entreprise", percentage: 65 }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          ACTIONS DE FORMATIONS
        </h2>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-md  p-8 text-center"
              >
                <div className="flex justify-center mb-4">
                  <Icon className={`w-12 h-12 ${stat.color}`} />
                </div>
                <div className={`text-5xl font-bold ${stat.color} mb-4`}>
                  {stat.number}
                </div>
                <p className="text-gray-600 text-lg">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Top Formations */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Top 2 de nos meilleures ventes de formations
          </h3>

          <div className="space-y-6">
            {topFormations.map((formation, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-3">
                  <span className="text-lg font-semibold text-gray-700 min-w-[200px]">
                    {formation.name}
                  </span>
                  <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-700 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
                      style={{ width: `${formation.percentage}%` }}
                    >
                      <span className="text-white font-semibold text-sm">
                        {formation.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}