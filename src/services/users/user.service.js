const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const fs = require('fs');
const path = require('path');

class UserService {

    constructor(UserRepository) {
        this.userRepository = UserRepository;
        this.nodemailer = nodemailer;
        this.bcrypt = bcrypt;
    }

    async getUsers() {
        try {
            return await this.userRepository.getUsers();
        } catch (error) {
            throw new Error(error);
        }
    };

    async getUserById(id) {
        try {
            return await this.userRepository.getUserById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    async createUser(userData) {
        try {
            return await this.userRepository.createUser(userData);
        } catch (error) {
            throw new Error(error);
        }
    };

    async createPassword(name) {

        const cleanName = name
            .trim()
            .replace(/\s+/g, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

        const finalName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

        const nrmd = Math.floor(Math.random() * 1000).toString().padStart(4, '0');
        return `${finalName}${nrmd}.`;
    };
    
    async sendEmail(email, password) {
        try {
            const transporter = this.nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
    
            let emailTemplate = fs.readFileSync(path.resolve('src', 'share', 'emailTemplate.html'), 'utf8');
            emailTemplate = emailTemplate.replace('{{email}}', email).replace('{{password}}', password);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: '¡Hola, CoffeLover! ☕',
                html: emailTemplate,
            };
    
            await transporter.sendMail(mailOptions);
            
        } catch (error) {
            console.error('Error sending credentials:', error);
            throw error;
        }
    };
    
}

module.exports = UserService;
