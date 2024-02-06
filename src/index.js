const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const collection = require("./config");

const app = express();
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static("public"));

app.get("/", (req,res)=> {
    res.render("register");
});
//enregistrer l'utilisateur
app.post("/register", async (req,res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword // Ajout du champ de confirmation de mot de passe
    }

    try {
        const userExistant = await collection.findOne({ email: data.email });

        if (userExistant) {
            res.render("register", { error: "L'adresse mail existe déjà, choisissez une adresse mail différente." });
        } else if (data.password !== data.confirmPassword) {
            res.render("register", { error: "Les mots de passe ne correspondent pas." });
        } else {
            data.password = await bcrypt.hash(data.password, 10);
            const userdata = await collection.insertMany(data);
            console.log(userdata);
            res.render("login");
        }
    } catch (error) {
        console.error(error);
        res.render("register", { error: "Une erreur s'est produite lors de l'enregistrement." });
    }
});


app.get("/login", (req,res) => {
    res.render("login");
});
const SECRET_KEY = 'letoken';
//vérifier la connexion de l'utilisateurs + génère un token
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            return res.render("login", { error: "Adresse e-mail invalide" });
        }

        const checkPassword = await bcrypt.compare(req.body.password, check.password);  //cache le mot de passe
        if (checkPassword) {
            const token = jwt.sign({ userId: check._id }, SECRET_KEY, { expiresIn: '1h' });
            res.render("login", { token, user: check });
        } else {
            return res.render("login", { error: "Mot de passe invalide" });
        }
    } catch (error) {
        return res.render("login", { error: "Détails incorrects" });
    }
});
// affiche la liste des utilisateurs
app.get('/user', async (req, res) => {
    try {
        const users = await collection.find({},'email');
        console.log(users);
        res.render('user',{users});
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des utilisateurs.');
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})