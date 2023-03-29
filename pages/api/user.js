import query from '../../lib/db';

export default async function handler(req, res){

    if (req.method === 'POST'){

        const { action } = req.body;
    
        if (action===undefined){
            res.status(200).json({error:'Invalid request'});
            return;
        }
        
        const { userId } = req.body;
        if(userId === undefined){
            res.status(200).json({error:'Invalid user'});
            return;
        }
    
        switch(action){
            case 'sendMessage':
                const { message, userTo } = req.body;
                const sentStatus = await sendMessage(userId, userTo, message);
                res.status(200).json(sentStatus);
                break;
            case 'deleteMessage':
                const { messageId } = req.body;
                break;
            case 'requestAction':
                const { requestId, status } = req.body;

                break;
        }
    } else if (req.method === 'GET'){
        const {action } = req.query;
        if (action===undefined){
            res.status(200).json({error:'Invalid request'});
            return;
        }

        const { userId } = req.query;
        if(userId === undefined){
            res.status(200).json({error:'Invalid user'});
            return;
        }

    
        switch(action){
            case 'getMessages':
                break;
            case 'getConversations':
                const convos = await getConversations(userId);
                break;
            case 'getRequests':
                break;
        }
    }
}

async function sendMessage(userId, userTo, message){
    const sql ='INSERT INTO `messages` (`userFrom`, `userTo`, `msg`) VALUES (?, ?, ?)';
    const vals = [userId, userTo, message];
    
    const result = await query(sql ,vals);

    if(result.error){
        return result;
    }

    return{
        sent:true
    };
}

async function getMessages(userId, conversationId) {

}

async function createConversation(users){
    const sql='INSERT INTO `conver';
    const vals = [...users];
}

async function getConversations(userId){
    const sql='SELECT DISTINCT users.username FROM messages m INNER JOIN users ON users.id = m.userTo WHERE m.userFrom = ?';
    const vals=[userId];

    const result = await query(sql, vals);
    if(result.error){
        return result;
    }

    const res = [];
    result.forEach(e=>{
        res.push({
            username: e.username,
            image: 'https://api.tecesports.com/images/general/user.png'
        });
    });

    return res;
}

async function deleteMessage(userId, messageId){
    sql='';
}

async function getRequests(userId){

}