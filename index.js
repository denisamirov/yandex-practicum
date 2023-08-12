const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors')
const path = require('path')
const nodemailer = require('nodemailer')
const directTransport = require('nodemailer-direct-transport')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT;
let users = [];
const fromHost = process.env.HOST;
    const from = process.env.MAIL + fromHost;
    const to = process.env.DEVELOPER;
    const transport = nodemailer.createTransport(directTransport({
      name: fromHost
    }));


passport.use(new LocalStrategy(
    (username, password, done) => {
    const user = users.find(user => user.username === username);

    if (!user || user.password !== password) {
        return done(null, false);
    }

    return done(null, user);
}))
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.static(path.join(__dirname, 'reactFrontend')));


// Реализуем эндпоинты для регистрации и аутентификации
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
  // Проверяем, что пользователь с таким именем не существует
  if (users.some(user => user.username === username)) {
      return res.status(400).send('Пользователь с таким именем уже существует');
  }
  else {
      // Создаем нового пользователя и добавляем его в список
      const newUser = { username, password };
      users.push(newUser);
      return res.json({res: "Пользователь зарегистрирован"})
  }
});


// Настройка сериализации и десериализации пользователей
passport.serializeUser((user, done) => {
  // Используем имя пользователя в качестве идентификатора сессии
  done(null, user.username);
});


passport.deserializeUser((username, done) => {
  // Восстанавливаем пользователя по имени пользователя
  const user = users.find(user => user.username === username);
  done(null, user);
});


// Защищаем доступ к контенту с помощью middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/'); // Перенаправляем на страницу логина, если пользователь не аутентифицирован
};


// Маршруты для регистрации и аутентификации
app.get('/login', (req, res) => {
  // Отображение страницы логина
  res.send('Вход');
});


// Запрос на вход
app.post(
  '/login',
  (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json(info); // Ошибка аутентификации
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(200).json({ message: 'Login successful' }); // Успешная аутентификация
        });
      })(req, res, next);
    });


// Переход к контенту
app.get('/content', ensureAuthenticated, (req, res) => {
  res.send('Ок!');
});


// Отправка формы на почту
app.post('/send', (req, res) => {
  try {
    const { message } = req.body;
    res.send('Ок!');

    transport.sendMail({
      from, to,
      subject: 'Сообщение с сервера',
      html: `
            <h3>Вам пришло письмо!</h3>
            ${message}
            `
    }, (err) => {
      if (err) {
        console.error('Ошибка при отправке:', err);
      } else {
        console.log('Письмо отправлено');
      }
    });

  }
  catch(err) {
    console.log(err)
  }
})


app.get('/logout', (req, res) => {
  req.logout(); 
  res.redirect('/'); 
});


app.listen(port, () => {
    console.log(`Приложение запущено на ${port} порту `)
})
