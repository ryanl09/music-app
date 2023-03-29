import query from '../../lib/db';

export default async function handler(req, res){
    const query = req.query;
    if (req.method === 'GET'){
        const { action } = query;

        if(action===undefined){
            res.status(200).json({error:'Invalid action'});
            return;
        }

        switch(action){
            case 'getSubscription':

                const { userId } = query;
                if (userId === undefined){
                    res.status(200).json({error:'Invalid user'});
                    return;
                }


                const status = await getSubscription(userId);
                res.status(200).json(status);
                break;
        }
    } else if (req.method === 'POST'){
        const { action } = req.body;

        if(action===undefined){
            res.status(200).json({error:'Invalid action'});
            return;
        }
        const { userId } = req.body;

        switch (action){
            case 'addSubscription':
                if (userId == undefined){
                    res.status(200).json({error:'Invalid user'});
                    return;
                }

                const addStatus = await addSubscription(userId);
                res.status(200).json(addStatus);
                break;
            case 'removeSubscription':
                if (userId == undefined){
                    res.status(200).json({error:'Invalid user'});
                    return;
                }

                const remStatus = await removeSubscription(userId);
                res.status(200).json(remStatus);
                break;
        }
    }
}

async function getSubscription(userId){
    const sql = 'SELECT COUNT(*) as `urows` FROM `subscriptions` WHERE `userId` = ?';
    const vals = [parseInt(userId, 10)];
    const result = await query(sql, vals);

    if (result.error){
        return result;
    }

    return {
        isSubscribed: result[0].urows > 0
    }
}

async function addSubscription(userId){
    const sql = `INSERT INTO subscriptions (userId)
        VALUES (?)
        ON DUPLICATE KEY UPDATE \`modified\` = NOW()`;
    const vals = [parseInt(userId, 10)];
    const result = await query(sql, vals);

    if (result.error){
        return result.error;
    }

    return {
        status: true
    }
}

async function removeSubscription(userId){
    const sql = 'DELETE FROM subscriptions WHERE userId = ?';
    const vals = [parseInt(userId, 10)];
    const result = await query(sql, vals);

    if(result.error){
        return result;
    }

    return {
        status: true
    }
}