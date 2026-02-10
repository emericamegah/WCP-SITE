require('dotenv').config();

const express = require('express');

const { initDatabase } = require('./database/visiteurs/db_visiteurs.js');

app.get("/", (req, res) => {
    res.json({ message: "WCP Backend is running !" });
});

const PORT = process.env.PORT;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);

(async () => {
    try {
        const sequelize = await initDatabase();

        if (sequelize) {
            User = UserModel(sequelize);
            global.User = User;

            await sequelize.sync({ alter: true });
            console.log('tables synchronized');

        }
    } catch (error) {
        console.error('Database initialization error:', error);
    }
})();
