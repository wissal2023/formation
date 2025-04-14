// config/userModel.js
const supabase = require('../supabaseClient.js');  

const userModel = {
    supabase: supabase,
    tableName: 'Users',
};

module.exports = userModel;