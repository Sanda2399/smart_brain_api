const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id: id
    })
    .then(userInfo => {
        if (userInfo.length)
        {
            res.json(userInfo[0]);
        }
        else 
        {
            res.status(400).json("User Not Found");
        }
    })
}
module.exports = {
    handleProfileGet: handleProfileGet
}