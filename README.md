# edubook-x

Objectif du Projet: Développer une plateforme web permettant aux étudiants d'acheter, vendre ou échanger des livres d'occasion ( don de livre ). Public Cible: Étudiants universitaires et scolaires. Bénéfices Attendus: Faciliter l'accès aux livres à un coût réduit et encourager le recyclage des livres.

pour installer le projet:

`git clone https://github.com/amirzacker/edubook-x.git`

installer les dependances:

1- `backend` :

- Aller dossier Backend : `cd backend`
- Installer les dependences : `composer install`

`.env`

1- config base de données :
remplacer les `!!` par vos identifiants et nom de la base DD

2- Stripe
Aller sur https://stripe.com/docs/development et générer vos CLE

`STRIPE_KEY=pk_test_51O*******`
`STRIPE_SECRET=sk_test_51O****`

`.php-version`
Dans ce fichier changer la version du php par la votre ,
pour connaitre votre version php:
`php --version`

2- `frontend`:

- Retour au dossier principale : `cd ..`
- Aller dossier Frontend : `cd frontend`
- Installer les dependences : `npm install`

`.env`

1- Encours...
