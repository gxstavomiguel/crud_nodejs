
function authenticator(req, res, next){
    const usuario = req.body.username;
    const senha = req.body.password;

   if (usuario === 'admin' && senha === '1234') {
    console.log('Login permitido');
    res.redirect('/admin')
   } else {
    res.redirect('/home');
    console.log('Informações incorretas')
   }
}

module.exports = authenticator;