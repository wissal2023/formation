// backend/config/userModel.js
const supabase = require('../supabaseClient.js');  

const userModel = {
    supabase: supabase,
    tableName: 'users',
};

module.exports = userModel;