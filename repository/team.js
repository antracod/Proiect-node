const db = require("../models");


/// Ruta pentru a returna toate echipele
module.exports.getAllTeams = async () => {
    try {
        const allTeams = await db.Team.findAll();
        return allTeams;
    } catch (error) {
        console.error("Something went wrong");
        return null;
    }
};

module.exports.getTeamById = async (id) => {
    const teamId = parseInt(id);

    try {
        const Team = await db.Team.findByPk(teamId);
        return Team;
    } catch (error) {
        console.error("Something went wrong");
        return null;
    }
};

module.exports.createTeam = async (req, res) => {
    const { name } = req.body;

    try {
        const team = await db.Team.create({
            name
        });

        res.status(201).send(team);
    } catch (error) {
        console.error(error);
        res.send({
            error: "Something went wrong",
        });
    }
};