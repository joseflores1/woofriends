const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

// Conexión a la base de datos
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'woofriends'
});

// Middleware para servir imágenes estáticas
app.use('/assets', express.static('public/assets'));

// Consulta para obtener datos de perros
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

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Connected to the database.');
});
