var answer = window.confirm("Ви дійсно бажаєте вийти?((");
if (answer) {
    localStorage.setItem('status', 'logged_out');
    window.location.href = 'index.html';
}
else {
    window.location.href = 'index.html';
}