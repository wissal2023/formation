/*
const supabase = require('../supabaseClient');

exports.storeOtp = async (email, otp) => {
    // Stocke l'OTP dans la base de données
    await supabase.from('otps').insert([{ email, otp, created_at: new Date() }]);
};

exports.getOtp = async (email) => {
    // Récupère l'OTP de la base de données
    const { data, error } = await supabase.from('otps').select('otp').eq('email', email).single();
    if (error) {
        throw new Error(error.message);
    }
    return data.otp;
};
*/