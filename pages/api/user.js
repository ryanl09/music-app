import query from '../../lib/db';

export default async function handler(req, res){
    res.status(200).json({success:'hu'})
    return;
    if (req.method === 'GET'){
        const { action } = req.query;

        if(action===undefined){
            res.status(200).json({error:'Invalid action'});
            return;
        }

        const { username } = req.query;
        if (username == undefined){
            res.status(200).json({error:'Invalid user'});
            return;
        }

        const userId = await getUserId(username);

        switch (action) {
            case 'getUserInfo':
                const info = await getUserInfo(userId);
                res.status(200).json(info);
                break;
        }
    }
}
