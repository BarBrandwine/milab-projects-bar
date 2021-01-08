// Read the file and stream it to client as text
let fs = require('fs');

const express = require('express');
const app = express();
app.use(express.static('./public'));

app.get('/files/', (req, res) => {

    let fileName = req.query.filename || null;
   
    // Make sure file exists
    if (!(fs.existsSync(`./public/${fileName}`))) {
        res.send("File not found in folder");
        return; 
    }
    fs.createReadStream(`./public/${fileName}`).pipe(res);
});

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});
