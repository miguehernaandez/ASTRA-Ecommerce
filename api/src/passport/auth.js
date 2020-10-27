const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db.js');

/*************************** Serializarion de User ****************************** */
passport.serializeUser((user, done) => {
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.FindOne({
		where: { id },
	})
		.then((user) => {
			if (user) {
				return done(null, user);
			} else {
				return done(new Error('User no encontrado'));
			}
		})
		.catch((err) => {
			return done(new Error('Internal Error'));
		});
});
/******************************************************************* */

/***************************  Configuracion de estrategia Local  ****************************** */
passport.use(
	'login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		(email, password, done) => {
			console.log('Email: ' + email);
			console.log('Password: ' + password);
			User.findOne({
				where: {
					email: email,
				},
			})
				.then((user) => {
					console.log('Entre al THEN');
					if (user) {
						if (User.comparePassword(password, user.password)) {
							console.log(user.password + 'Entre al IF');
							return done(null, {
								email: user.email,
								id: user.id,
								role: user.role,
								name: user.name,
							});
						} else {
							console.log('Password incorrect');
							return done(new Error('Password incorrect'));
						}
					} else {
						console.log('User not Found');
						return done(new Error('User not found'), null);
					}
				})
				.catch((err) => {
					console.error(err);
					return done(new Error('Internal error'), null);
				});
		}
	)
);

/************************************************************************* */
