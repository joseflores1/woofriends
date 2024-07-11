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

// Ruta para obtener datos de perros, excluyendo los ya favoritos de un usuario
app.get('/dogs/:userId', async (req, res) => {
    const { userId } = req.params;
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
            WHERE d.id NOT IN (SELECT dog_id FROM favorites WHERE user_id = ?)
            GROUP BY 
                d.id;
        `;

        const [rows] = await db.query(query, [userId]);
        
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

// Ruta para obtener todos los datos de perros (para SearchTab)
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
                favorites f
            JOIN 
                dogs d ON f.dog_id = d.id
            LEFT JOIN 
                dog_colors dc ON d.id = dc.dog_id
            LEFT JOIN 
                colors c ON dc.color_id = c.id
            LEFT JOIN 
                dog_relations r ON d.id = r.dog_id
            WHERE 
                f.user_id = ?
            GROUP BY 
                d.id;
        `;
        const [rows] = await db.query(query, [userId]);

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
        console.error('Error fetching favorite dogs:', error);
        res.status(500).json({ error: 'Error fetching favorite dogs' });
    }
});

// Ruta para guardar las preferencias de usuario
app.post('/preferences', async (req, res) => {
    const { userId, sexo, color, tipo, personalidad_personas, carácter, nivel_energia, esterilizado, vacunas, personalidad_perros, tamaño } = req.body;
    try {
        const query = `
            INSERT INTO preferences (user_id, sexo, color, tipo, personalidad_personas, carácter, nivel_energia, esterilizado, vacunas, personalidad_perros, tamaño)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            sexo = VALUES(sexo), color = VALUES(color), tipo = VALUES(tipo), personalidad_personas = VALUES(personalidad_personas), 
            carácter = VALUES(carácter), nivel_energia = VALUES(nivel_energia), esterilizado = VALUES(esterilizado), 
            vacunas = VALUES(vacunas), personalidad_perros = VALUES(personalidad_perros), tamaño = VALUES(tamaño);
        `;
        await db.query(query, [userId, sexo, color, tipo, personalidad_personas, carácter, nivel_energia, esterilizado, vacunas, personalidad_perros, tamaño]);
        res.status(200).json({ message: 'Preferencias guardadas correctamente' });
    } catch (error) {
        console.error('Error guardando preferencias:', error);
        res.status(500).json({ error: 'Error guardando preferencias' });
    }
});

// Ruta para obtener las preferencias de usuario
app.get('/preferences/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM preferences WHERE user_id = ?', [userId]);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching preferences:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener las preferencias' });
    }
});

app.get('/matches/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Obtener las preferencias del usuario
        const [preferences] = await db.query('SELECT * FROM preferences WHERE user_id = ?', [userId]);
        if (preferences.length === 0) {
            return res.status(404).json({ error: 'No se encontraron preferencias para este usuario' });
        }
        const userPreferences = preferences[0];

        // Obtener todos los perros y comparar con las preferencias del usuario
        const [dogs] = await db.query('SELECT * FROM dogs');

        const matchedDogs = dogs.filter(dog => {
            let matchCount = 0;
            let totalCriteria = 0;

            if (userPreferences.sexo) {
                totalCriteria++;
                if (dog.sexo === userPreferences.sexo) matchCount++;
            }
            if (userPreferences.color) {
                totalCriteria++;
                if (dog.color === userPreferences.color) matchCount++;
            }
            if (userPreferences.tipo) {
                totalCriteria++;
                if (dog.tipo === userPreferences.tipo) matchCount++;
            }
            if (userPreferences.personalidad_personas) {
                totalCriteria++;
                if (dog.personalidad_personas === userPreferences.personalidad_personas) matchCount++;
            }
            if (userPreferences.carácter) {
                totalCriteria++;
                if (dog.carácter === userPreferences.carácter) matchCount++;
            }
            if (userPreferences.nivel_energia) {
                totalCriteria++;
                if (dog.nivel_energia === userPreferences.nivel_energia) matchCount++;
            }
            if (userPreferences.esterilizado) {
                totalCriteria++;
                if (dog.esterilizado === userPreferences.esterilizado) matchCount++;
            }
            if (userPreferences.vacunas) {
                totalCriteria++;
                if (dog.vacunas === userPreferences.vacunas) matchCount++;
            }
            if (userPreferences.personalidad_perros) {
                totalCriteria++;
                if (dog.personalidad_perros === userPreferences.personalidad_perros) matchCount++;
            }
            if (userPreferences.tamaño) {
                totalCriteria++;
                if (dog.tamaño === userPreferences.tamaño) matchCount++;
            }

            const matchPercentage = (matchCount / totalCriteria) * 100;
            return matchPercentage >= 50;
        });


        res.json(matchedDogs);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Hubo un problema al obtener los matches' });
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Connected to the database.');
});
