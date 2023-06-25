// Controlador para o modelo User

var User = require('../models/user')

// Lista de Users
module.exports.list = () => {
    return User
            .find()
            .sort('name')
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


// User Logout
module.exports.userLogout = usr => {
    return User.updateOne({username: usr}, {active: false})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

// User Login
module.exports.userLogin = (usr, date) => {
    return User.updateOne({username: usr}, {active: true, lastAccess: date})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.getUser = username => {
    return User.findOne({username: username})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addUser = u => {
    return User.create(u)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.updateUser = (id, info) => {
    return User.updateOne({_id:id}, info)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserStatus = (id, status) => {
    return User.updateOne({username: id}, {active: status})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateUserPassword = (id, pwd) => {
    return User.updateOne({_id:id}, pwd)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteUser = id => {
    return User.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addFav = (username, fav) => {
    return User.findOne({username: username})
        .then(resposta => {
            console.log("AQUI")
            console.log(resposta)
            const found = resposta.favs.some(favv => favv.Processo === fav.Processo);
            
            if (found) {
                console.log("AQUI1")
                return User.updateOne({ username: username }, { $pull: { favs: { Processo: fav.Processo } } })
                    .then(resposta => {
                        return resposta
                    })
                    .catch(erro => {
                        return erro
                    })
            }

            else {
                console.log("AQUI2")
                return User.updateOne({ username: username }, { $push: { favs: fav } })
                    .then(resposta => {
                        return resposta
                    })
                    .catch(erro => {
                        return erro
                    })
            }
        })
        .catch(erro => {
            return erro
        })
}