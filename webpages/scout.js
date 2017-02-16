var users = ['marcus'];
var passwords = ['up'];

document.getElementById('login').onclick = function(){
    var user = document.getElementById('username');
    var pass = document.getElementById('password');
    
    if(user.value == users[0] && pass == passwords[0]){
        alert("well done");
        
}
