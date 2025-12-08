const express = require('express');
const fs = require('fs');
const path = require('path');
 
const app = express();
const PORT = 3000;
 
// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));
 
// Methods to work with user info

// Middleware to parse JSON bodies
app.use(express.json());
 
// Endpoint to get JSON data
app.get('/user-data', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to update JSON data
app.post('/add-user-data', (req, res) => {
    const newData = req.body;
 
    // Read the existing data
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
 
        // Update the data and write back to the file
        const jsonData = JSON.parse(data);
        jsonData.push(newData);
 
        fs.writeFile('./users.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to data file');
                return;
            }
            res.status(200).send('Data successfully updated!');
        });
    });
});

app.patch('/update-user-data/:name', (req, res) => {
  try {
    const name = req.params.name;
    const updates = req.body;

    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
 
        // Update the data and write back to the file
        const jsonData = JSON.parse(data);
        const i = jsonData.findIndex(d => d.name === name);
        jsonData[i] = { ...jsonData[i], ...updates};
 
        fs.writeFile('./users.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to data file');
                return;
            }
            res.status(200).send('Data successfully updated!');
        });
    });
  } catch (err) {
    console.error(err);
  }
});


// Methods to work with post info

app.get('/post-data', (req, res) => {
    fs.readFile('./posts.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.post('/add-post-data', (req, res) => {
    const newData = req.body;
 
    // Read the existing data
    fs.readFile('./posts.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
 
        // Update the data and write back to the file
        const jsonData = JSON.parse(data);
        jsonData.push(newData);
 
        fs.writeFile('./posts.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to data file');
                return;
            }
            res.status(200).send('Data successfully updated!');
        });
    });
});

app.patch('/update-post-data/:id', (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    fs.readFile('./posts.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }
 
        // Update the data and write back to the file
        const jsonData = JSON.parse(data);
        const i = jsonData.findIndex(d => d.id === id);
        jsonData[i] = { ...jsonData[i], ...updates};
 
        fs.writeFile('./posts.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                res.status(500).send('Error writing to data file');
                return;
            }
            res.status(200).send('Data successfully updated!');
        });
    });
  } catch (err) {
    console.error(err);
  }
});

 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});