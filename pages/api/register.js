import query from '../../lib/db';

export default async function handler (req, res) {

    if (req.method !== 'POST'){
        res.status(200).error({ error: 'Invalid request '});
        return;
    }

    const body = req.body;

    if (body.name === undefined || body.email === undefined || body.username === undefined
        || body.password === undefined || body.confirmpassword === undefined){
            res.status(200).json({ error: 'Missing fields '});
            return;
        }

    const crypto = require('crypto');
    const key = crypto.randomBytes(15).toString('hex');
    const passHash = await hashPassword(body.password);

    const sql = `INSERT INTO users (name, email, username, password, activationKey)
        VALUES (?, ?, ?, ?, ?)`;
    const values = [body.name, body.email, body.username, passHash, key];
    const q = await query(sql, values);

    res.status(200).json({ success: true });
}

async function hashPassword (pass) {
    const bcrypt = require('bcrypt');

    const password = pass;
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword;
  }