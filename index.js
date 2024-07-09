const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

app.use(express.json()); // Asegura que podamos leer JSON en las solicitudes

// Conexión a la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'woofriends'
});

// Middleware para servir imágenes estáticas
app.use('/assets', express.static('public/assets'));

// Ruta de registro de usuario
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [result] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        const newUser = {
            id: result.insertId,
            username: username,
            email: email
        };
        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Hubo un problema al registrarse' });
    }
});

// Ruta de inicio de sesión de usuario
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [users] = await db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (users.length > 0) {
            const user = users[0];
            res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, email: user.email } });
        } else {
            res.status(400).json({ error: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Hubo un problema al iniciar sesión' });
    }
});

// Ruta para obtener datos de perros
app.get('/dogs', async (req, res) => {
    try {
        const query = `
            SELECT 
                d.id, 
                d.nombre, 
                d.sexo, 
                d.edad, 
                GROUP_CONCAT(DISTINCT COALESCE(c.color, d.color) SEPARATOR ', ') as colors, 
                d.tipo, 
                d.personalidad_personas, 
                d.carácter, 
                d.nivel_energia, 
                d.esterilizado, 
                d.vacunas, 
                d.personalidad_perros, 
                d.tamaño, 
                d.image_path, 
                COALESCE(GROUP_CONCAT(DISTINCT r.related_dog_id), 'No tiene') as relacion
            FROM 
                dogs d
            LEFT JOIN 
                dog_colors dc ON d.id = dc.dog_id
            LEFT JOIN 
                colors c ON dc.color_id = c.id
            LEFT JOIN 
                dog_relations r ON d.id = r.dog_id
            GROUP BY 
                d.id;
        `;

        const [rows] = await db.query(query);
        
        // Reemplaza related_dog_id con los nombres reales de los perros
        for (const row of rows) {
            if (row.relacion !== 'No tiene') {
                const relatedIds = row.relacion.split(',');
                const relatedNames = await Promise.all(relatedIds.map(async (id) => {
                    const [relatedDog] = await db.query('SELECT nombre FROM dogs WHERE id = ?', [id]);
                    return relatedDog[0]?.nombre || id;
                }));
                row.relacion = relatedNames.join(', ');
            }
        }

        res.json(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error });
    }
});

// Ruta para agregar un perro a favoritos
app.post('/favorites', async (req, res) => {
    const { userId, dogId } = req.body;
    if (!userId || !dogId) {
        return res.status(400).json({ error: 'Faltan datos de usuario o perro' });
    }
    try {
        const [result] = await db.query('INSERT INTO favorites (user_id, dog_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE user_id = user_id, dog_id = dog_id', [userId, dogId]);
        res.status(201).json({ message: 'Perro agregado a favoritos', id: result.insertId });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        res.status(500).json({ error: 'Hubo un problema al agregar a favoritos' });
    }
});

// Ruta para obtener los favoritos de un usuario
app.get('/favorites/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await db.query('SELECT dogs.* FROM favorites JOIN dogs ON favorites.dog_id = dogs.id WHERE favorites.user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener los favoritos' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Connected to the database.');
});
