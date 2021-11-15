const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    // Security Check ///
    if (!email || !name || !password)
    {
       return res.status(400).json("Incorrect form submission");
    }
    /////////////////////
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            db('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(userInfo => {
                res.json(userInfo[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
        res.status(400).json(err);
    })
}

module.exports = {
    handleRegister:handleRegister
};