const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, enum: ['Vente', 'Location', 'Neuf', 'Terrain'], required: true },
  category: { type: String, enum: ['Maison', 'Appartement', 'Villa', 'Terrain'], required: true },
  location: { type: String, required: true }, // Ex: "La Marsa, Tunis"
  bedrooms: { type: Number, default: 0 },
  bathrooms: { type: Number, default: 0 },
  area: { type: Number, required: true }, // En m²
  images: [{ type: String }], // Tableau d'URLs d'images
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);