module.exports = function(app, Node)
{
    console.log('dbmanager');
    
    // GET ALL NODES
    app.get('/api/map', function(req,res){
        Node.find(function(err, map){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(map);
        });
    });
/*
    // GET SINGLE NODES
    app.get('/api/books/:book_id', function(req, res){
        Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
        })
    });

    // GET NODE BY ID(player)
    app.get('/api/books/author/:author', function(req, res){
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(books);
        })
    });
    */
        
    // CREATE NODE
    app.get('/api/node', function(req, res){
        var node = new Node();
        node.id = 0;
        node.name = 'test';
        node.background = 0;
        node.event = 0;
        node.boss = false;
        node.next = 1;

        node.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });

    /*

    // UPDATE NODE
    app.put('/api/books/:book_id', function(req, res){
        Book.update({ _id: req.params.book_id }, { $set: req.body }, function(err, output){
            if(err) res.status(500).json({ error: 'database failure' });
            console.log(output);
            if(!output.n) return res.status(404).json({ error: 'book not found' });
            res.json( { message: 'book updated' } );
        })
    // [ ANOTHER WAY TO UPDATE THE BOOK ]
    //        Book.findById(req.params.book_id, function(err, book){
    //        if(err) return res.status(500).json({ error: 'database failure' });
    //        if(!book) return res.status(404).json({ error: 'book not found' });
    //        if(req.body.title) book.title = req.body.title;
    //        if(req.body.author) book.author = req.body.author;
    //        if(req.body.published_date) book.published_date = req.body.published_date;
    //        book.save(function(err){
    //            if(err) res.status(500).json({error: 'failed to update'});
    //            res.json({message: 'book updated'});
    //        });
    //    });
    });
*/


    // DELETE NODE
    app.get('/api/map/:node_id', function(req, res){
        Node.remove({id: req.params.node_id}, function(err) {
            if (err) {
                //console.log(err);
                return res.status(500).json({ error: 'database failure'});
            }
            return res.json({ result: 'node deleted!' });
        });
    });
}



