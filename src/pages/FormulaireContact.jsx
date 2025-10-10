import React, { useState } from 'react'
import { Send } from 'lucide-react'

export default function FormulaireContact({ titre, type }) {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    telephone: '',
    message: '',
    typeFormulaire: type || 'general'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulaire soumis:', formData)
    alert(`Formulaire "${titre}" soumis avec succès !`)
    
    setFormData({
      nom: '',
      email: '',
      objet: '',
      telephone: '',
      message: '',
      typeFormulaire: type || 'general'
    })
  }

  return (
    <div className="relative">
      
       
          <div className="relative h-80 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1600&h=600&fit=crop"
          alt="Contact"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-purple-950/85"></div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {titre}
            </h1>
          </div>
        </div>
      </div>

        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            Nous vous écoutons.
          </h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre nom
              </label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre e-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Objet
              </label>
              <input
                type="text"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre N° téléphone
              </label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Votre message (facultatif)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all resize-none"
              />
            </div>

            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <span>ENVOYER</span>
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

       
      
    </div>
  )
}

