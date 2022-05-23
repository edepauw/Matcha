async function auth(req, res, next) {
	try {
	  const { cookies, headers } = req;

	  /* On vérifie que le JWT est présent dans les cookies de la requête */
	  if (!cookies || !cookies.access_token) {
		return res.status(401).json({ message: 'Missing token in cookie' });
	  }

	  const accessToken = cookies.access_token;

	  /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
	  if (!headers || !headers['x-xsrf-token']) {
		return res.status(401).json({ message: 'Missing XSRF token in headers' });
	  }

	  const xsrfToken = headers['x-xsrf-token'];

	  /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
	  const decodedToken = jwt.verify(accessToken, secret, {
		algorithms: algorithm
	  });

	  /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
	  if (xsrfToken !== decodedToken.xsrfToken) {
		return res.status(401).json({ message: 'Bad xsrf token' });
	  }

	  /* On vérifie que l'utilisateur existe bien dans notre base de données */
	  const userId = decodedToken.sub;
	  const user = await User.findOne({ where: { id: userId } });
	  if (!user) {
		return res.status(401).json({ message: `User ${userId} not exists` });
	  }

	  /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
	  req.user = user;

	  /* On appelle le prochain middleware */
	  return next();
	} catch (err) {
	  return res.status(500).json({ message: 'Internal error' });
	}
  }
