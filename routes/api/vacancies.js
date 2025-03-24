const express = require("express");
const router = express.Router();
const Vacancies = require("../../models/Vacancies");


router.get('/vacancies', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [vacancies, count] = await Promise.all([
        Vacancies.find().limit(limit).skip(skip),
        Vacancies.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `vacancies ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(vacancies);
});

router.post('/vacancies', async (req, res) => {
    console.log(req.body.name);
    const { name, type, place, link, visibility } = req.body;
    const vacancies = new Vacancies({
        name, type, place, link, visibility
    });

    await vacancies.save();

    res.json(vacancies);
});


router.get('/vacancies/:id', async (req, res) => {
    const { id } = req.params;
    const vacancies = await Vacancies.findById(id);

    if (!vacancies) {
        return res.status(404).json({ error: 'Vacancies not found' });
    }

    res.json(vacancies);
});

router.put("/vacancies/:id", async (req, res) => {
    const { id } = req.params;
    const { name, type, place, link, visibility } = req.body;

    const vacancies = await Vacancies.findById(id);
    if (!vacancies) {
        return res.status(404).json({ error: 'Vacancies not found' });
    }

    vacancies.name = name;
    vacancies.type = type;
    vacancies.place = place;
    vacancies.link = link;
    vacancies.visibility = visibility;

    await vacancies.save();

    res.json(vacancies);
});

router.delete("/vacancies/:id", async (req, res) => {
    const { id } = req.params;
    await Vacancies.findByIdAndDelete(id);
    res.json({ success: true });
});

module.exports = router;