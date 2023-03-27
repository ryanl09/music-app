import query from '../../lib/db';

export default async function handler(req, res){

    if (req.method !== 'POST'){
        res.status(200).error({ error: 'Invalid request '});
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
    let sql = `SELECT DISTINCT users.username
    FROM users `;

    let vals = [];

    if (accountTags.length > 0){
        let ins = Array(accountTags.length).fill('?').join(',');
        sql += `INNER JOIN userAccountTags uat ON uat.userId = users.id
            AND uat.accountTagId IN (${ins}) `;

        vals = [...accountTags];
    }

    if (musicTags > 0){
        let ins = Array(accountTags.length).fill('?').join(',');
        sql += `INNER JOIN userMusicTags umt ON umt.userId = users.id
            AND umt.musicTagId IN (${ins}) `;

        vals = [...vals, ...musicTags];
    }

    sql += `ORDER BY users.username ASC`;

    return await query(sql, vals);
}

const accountJoin = (a) => {
    if(a.length <= 0){
        return '';
    }

    let sql = ``;
    a.forEach((e, i) => {
        sql += `INNER JOIN userAccountTags u${i}`
    });
}

const musicJoin = (m) => {
    if(m.length <= 0){
        return '';
    }


}