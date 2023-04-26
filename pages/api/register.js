import query from '../../lib/db';
import { hashPassword } from '../../lib/security.js';

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
    const re = await query(sql, values);
    const { insertId } = re;
    const fans = await query(`INSERT INTO userFans VALUES (?, 0, 0)`, [insertId]);

    res.status(200).json({ success: true });
}