import query from '../../lib/db';

export default async function handler(req, res){

    if (req.method !== 'POST'){
        res.status(200).json({ error: 'Invalid request '});
        return;
    }

    const body = req.body;
    const accountTags = body.accountTags;
    const musicTags = body.musicTags;

    const results = await searchUsers(accountTags, musicTags);

    if (results.error){
        res.status(200).json(results);
        return;
    }

    res.status(200).json({success: results});
}

async function searchUsers(accountTags, musicTags) {
    let sql = `SELECT users.id, users.username, userFans.streams, userFans.followers
    FROM users 
    INNER JOIN userFans on userFans.userId = users.id `;

    let vals = [];
    let ac = accountTags.length;
    let mc = musicTags.length;
    let where = '';
    let having = '';

    if (ac > 0){
        let ins = Array(accountTags.length).fill('?').join(',');
        sql += `INNER JOIN userAccountTags uat ON uat.userId = users.id`;

        vals = [...accountTags];
        where = `uat.accountTagId IN (${ins})`;
        having = `COUNT(DISTINCT uat.accountTagId) = ${ac}`;
    }

    if (mc > 0){
        let ins = Array(musicTags.length).fill('?').join(',');
        sql += ` INNER JOIN userMusicTags umt ON umt.userId = users.id`;

        vals = [...vals, ...musicTags];

        if(where){
            where += ' AND ';
        }
        where += `umt.musicTagId IN (${ins})`;

        if(having){
            having += ' AND ';
        }
        having += `COUNT(DISTINCT umt.musicTagId) = ${mc}`;
    }

    sql += `${where ? ` WHERE ${where}` : ''}
     ${having ? `GROUP BY users.id HAVING ${having}` : ''}
     ORDER BY userFans.streams DESC, userFans.followers DESC, users.username`;

    return await query(sql, vals);
}