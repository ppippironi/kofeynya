// Плавная прокрутка к разделам (запасной вариант для браузеров без scroll-behavior)
document.querySelectorAll('.nav a, .logo, .btn[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    var target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', link.getAttribute('href'));
  });
});

// Подсветка пункта меню текущего раздела
var navLinks = document.querySelectorAll('.nav a');
window.addEventListener('scroll', function () {
  var current = '';
  document.querySelectorAll('main section').forEach(function (s) {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(function (a) {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Форма обратной связи: проверка полей и email (наличие @)
var form = document.getElementById('feedback');
var msg = document.getElementById('formMsg');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = form.name.value.trim();
  var email = form.email.value.trim();
  var text = form.message.value.trim();
  var errors = [];

  [form.name, form.email, form.message].forEach(function (f) { f.classList.remove('invalid'); });

  if (!name) { errors.push('введите имя'); form.name.classList.add('invalid'); }
  if (email.indexOf('@') === -1) {
    errors.push('email должен содержать символ @');
    form.email.classList.add('invalid');
  }
  if (!text) { errors.push('напишите сообщение'); form.message.classList.add('invalid'); }

  if (errors.length) {
    msg.className = 'form__msg error';
    msg.textContent = 'Проверьте форму: ' + errors.join(', ') + '.';
    return;
  }
  msg.className = 'form__msg ok';
  msg.textContent = 'Спасибо, ' + name + '! Мы ответим на ' + email + ' в ближайшее время.';
  form.reset();
});
