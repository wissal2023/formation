// models/userModel.js
const supabase = require('../supabaseClient.js');  

// Déclaration de l'utilisateur (ici tu interagis seulement avec la base de données)
const userModel = {
    supabase: supabase,
    tableName: 'Users',
};

module.exports = userModel;