// models/userModel.js
const supabase = require('../supabaseClient.js');  // Importer l'instance Supabase

// Déclaration de l'utilisateur (ici tu interagis seulement avec la base de données)
const userModel = {
    supabase: supabase,
    tableName: 'users',
};

module.exports = userModel;