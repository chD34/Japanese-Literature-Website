

function enter(e){
    event.preventDefault();

    var email  = document.getElementById('email').value;
    var pass = document.getElementById("pass").value;
    
    var user = localStorage.getItem(email);
    var data = JSON.parse(user);

    if (data != null){
      if ((email == data.email) && (pass == data.password)){
        alert('Вітаю! Вхід успішний!');
        localStorage.setItem('status', 'logged_in');
        window.location.href = 'index.html';
      }
    }
    else{
      alert('Пароль, Email чи обидвоє не дійсні. Можливо зареєструєтесь?');
    }
};


if (localStorage.getItem('status')){
  var stat  = localStorage.getItem('status');
  if (stat == 'logged_in'){
    enter_form.classList.add('hidden');
  }
  else if (stat == 'logged_out'){
    enter_form.classList.add('visible');
    exit.classList.add('hidden');
  }
  else{
    enter_form.classList.add('visible');
  }
}


