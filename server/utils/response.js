
const response = (res, status, message, data) => {

    if( !status ) {
        if( message.errors ) {
            
            console.log("err", message.errors)
            
        }
    }


    return res.json({
        "status": status,
        "message": message,
        "data": data
    });
}

module.exports = response