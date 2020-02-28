module.exports = {

    async getUsers(req, res) {                                          // Testado: OK
        console.log('chegou em "Controllers>Usuarios.getUsuarios"');

        try {
            const users = {};

            return res.json(users);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },


};