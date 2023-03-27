import query from '../../lib/db';
import { hashPassword } from '../../lib/security.js';

export default async function handler (req, res) {

    if (req.method !== 'POST'){
        res.status(200).error({ error: 'Invalid request '});
        return;
    }

    const body = req.body;

    const action = body.action;
    const tagId = body.tagId;
    const user = body.user;

    switch (action){
        case 'addAccountTag':
            const res = await addAccountTag(user, tagId);
            break;
        case 'removeAccountTag':
            await removeAccountTag(user, tagId);
            break;
        case 'addMusicTag':
            await addMusicTag(user, tagId);
            break;
        case 'removeMusicTag':
            await removeMusicTag(user, tagId);
            break;
    }

    res.status(200).json({ success: true });
}


async function addAccountTag(user, tag) {
    const sql = `
    INSERT INTO userAccountTags (userId, accountTagId)
    SELECT users.id, ? FROM users WHERE LOWER (username) = LOWER(?)
    ON DUPLICATE KEY UPDATE userId = userId`;
    const vals = [tag, user];

    return await query(sql, vals);
} 

async function removeAccountTag(user, tag){
    const sql = `
    DELETE FROM userAccountTags WHERE accountTagId = ? AND userId = (SELECT id FROM users WHERE LOWER(username) = LOWER(?))`;
    const vals = [tag, user];

    return await query(sql, vals);
}

async function addMusicTag(user, tag) {
    const sql = `
    INSERT INTO userMusicTags (userId, musicTagId)
    SELECT users.id, ? FROM users WHERE LOWER (username) = LOWER(?)
    ON DUPLICATE KEY UPDATE userId = userId`;
    const vals = [tag, user];

    return await query(sql, vals);
}

async function removeMusicTag(user, tag){
    const sql = `
    DELETE FROM userMusicTags WHERE musicTagId = ? AND userId = (SELECT id FROM users WHERE LOWER(username) = LOWER(?))`;
    const vals = [tag, user];

    return await query(sql, vals);
}