import React, { useState } from 'react';
import { Play, Video } from 'lucide-react';

export default function Videos() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: "COMMENT REJOINDRE UNE FORMATION SUR ZOOM",
      videoPath: "/Video1.webm"
    },
    {
      id: 2,
      title: "SE CONNECTER À LA PLATEFORME DE FORMATION « dokeos »",
      videoPath: "/Video2.webm"
    }
  ];

  const handlePlayVideo = (videoId) => {
    setPlayingVideo(videoId);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full mb-4">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tutoriels Vidéo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment utiliser nos outils de formation en ligne
          </p>
        </div>

        {/* Videos Grid - Reduced Size */}
        <div className="max-w-4xl mx-auto space-y-10">
          {videos.map((video) => (
            <div 
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Video Title */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
                <h3 className="text-lg md:text-xl font-bold text-white text-center">
                  {video.title}
                </h3>
              </div>

              {/* Video Player - Reduced Size */}
              <div className="relative bg-gray-900" style={{ paddingBottom: '42%' }}>
                <div className="absolute inset-0">
                  {playingVideo === video.id ? (
                    <video
                      className="w-full h-full"
                      controls
                      autoPlay
                      onEnded={() => setPlayingVideo(null)}
                    >
                      <source src={video.videoPath} type="video/webm" />
                      Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center cursor-pointer group relative"
                      onClick={() => handlePlayVideo(video.id)}
                    >
                      {/* Video as thumbnail - first frame */}
                      <video 
                        className="absolute inset-0 w-full h-full object-cover"
                        src={video.videoPath}
                        preload="metadata"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300 shadow-2xl">
                          <Play className="w-8 h-8 text-purple-600 group-hover:text-white ml-1" fill="currentColor" />
                        </div>
                      </div>

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Video Description */}
              <div className="p-5 bg-gray-50">
                <p className="text-gray-600 text-center text-sm">
                  {video.id === 1 
                    ? "Apprenez à rejoindre facilement vos sessions de formation sur Zoom."
                    : "Découvrez comment accéder à votre espace personnel sur dokeos."
                  }
                </p>
              </div>
            </div>
          ))}
        </div>

       

      </div>
    </div>
  );
}