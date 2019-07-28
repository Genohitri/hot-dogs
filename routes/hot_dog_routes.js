var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
  });

  app.get('/hot-dogs', (req, res) => {
    const hotDogs = db.collection('hot_dogs').find().toArray( (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });
  

  app.get('/hot-dogs/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('hot_dogs').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });

  app.post('/hot-dogs', (req, res) => {
    console.log(req.body);
    const hotDog = { title: req.body.title};
    db.collection('hot_dogs').insert(hotDog, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/hot-dogs/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('hot_dogs').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });

  app.put ('/hot-dogs/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('hot_dogs').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};