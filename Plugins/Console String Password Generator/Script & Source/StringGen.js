
setTimeout(() => {
for (let i = 1; i <= 4; i++) {
console.clear()
}
}, "1000")


setTimeout(() => {
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$!@#_=_;.,$!*&';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

for (let i = 1; i <= 80; i++) {
console.log(makeid(45));
}

}, "2000")