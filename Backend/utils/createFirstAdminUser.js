// utils/createFirstAdminUser.js
const { User } = require('../db/models');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

async function createFirstAdminUser() {
  try {
    const existingAdmin = await User.findOne({ where: { roleUtilisateur: 'Admin' } });

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.email);
      return;
    }

    const randomPassword = uuidv4().slice(0, 10);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const adminUser = await User.create({
      email: process.env.ADMIN_EMAIL,
      mdp: hashedPassword,
      username: 'First_Admin',
      roleUtilisateur: 'Admin'
    });

    console.log('Admin user created successfully');

    // 🔐 Generate JWT token
    const token = jwt.sign(
      { id: adminUser.id, role: adminUser.roleUtilisateur },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminUser.email,
      subject: 'Your Admin Account Credentials',
      text: `Welcome to the platform!\n\nEmail: ${adminUser.email}\nPassword: ${randomPassword}\n\nAuth Token: ${token}`
    });

    console.log('Admin credentials sent to email');
    console.log('Admin Auth Token:', token);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
  }
}

module.exports = createFirstAdminUser;
