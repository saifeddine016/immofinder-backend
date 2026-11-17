const Property = require('../models/Property');

// @desc    Créer une annonce
// @route   POST /api/properties
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      owner: req.user._id, // L'utilisateur connecté
    });
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: 'Erreur création annonce', error: error.message });
  }
};

// @desc    Obtenir toutes les annonces (avec filtres simples)
// @route   GET /api/properties
exports.getProperties = async (req, res) => {
  try {
    const { type, category, location } = req.query;
    let query = {};
    if (type) query.type = type;
    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: 'i' };

    const properties = await Property.find(query).populate('owner', 'fullName email phone');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Erreur récupération annonces', error: error.message });
  }
};

// @desc    Obtenir une annonce par ID
// @route   GET /api/properties/:id
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'fullName email phone');
    if (!property) return res.status(404).json({ message: 'Annonce non trouvée' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
};