const router = require('express').Router();
const { Cocktail } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const cocktailData = await Cocktail.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                    // model: User,
                    // attributes: ['name'],
                },
                {
                    // model: Comment,
                    // attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                    // include: {
                    //     model: User,
                    //     attributes: ['name']
                    // }
                },
            ],
        });

        const cocktails = cocktailData.map((cocktail) => cocktail.get({ plain: true }));

        res.render('profile', {
            cocktails,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newrecipe', (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }
    res.render('new-recipe');
});

router.get('/editrecipe/:id', withAuth, async (req, res) => {
    try {
        const cocktailData = await Cocktail.findByPk(req.params.id, {
            attributes: [
                'id',
            ],
            include: [
                {
                    // model: User,
                    // attributes: ['name'],
                },
                {
                    // model: Comment,
                    // attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                    // include: {
                    //     model: User,
                    //     attributes: ['name']
                    // }
                },
            ],
        });

        const cocktail = cocktailData.get({ plain: true });

        res.render('edit-recipe', {
            cocktail,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;