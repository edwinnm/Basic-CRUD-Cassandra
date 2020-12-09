/*jshint esversion: 8 */
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ["127.0.0.1:9042" || 'cassandra'],localDataCenter: 'datacenter1',  keyspace: 'grocery' });
client.connect(function(err, result){
    if (err){
        console.log(err)
    }
    else{
        console.log('groceries: cassandra connected');
    }
    
});

const groceriesCtrl = {};

groceriesCtrl.getGroceries = async(req, res) => {
	client.execute('SELECT * FROM  grocery.fruit_stock',[], function(err, result){
		if(err){
			console.log('Groceries: list err:', err);
			res.status(404).send({msg: err});
		} else {
            console.log('Groceries: list succ:', result.rows);
            res.json(result.rows)
			
		}
	});
   
};

groceriesCtrl.createGrocery= async(req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    client.execute(`INSERT INTO grocery.fruit_stock (item_id, name, price_p_item) VALUES ('${input.id}', '${input.name}', ${input.price} );`,[], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({ message: "Grocery creado", grocery: input });
		}
	});

};

groceriesCtrl.getGrocery = async(req, res) => {
	var id = req.params.id;
    client.execute(`SELECT * FROM  grocery.fruit_stock WHERE item_id = '${id}'`,[], function(err, result){
		if(err){
			console.log('Groceries: list err:', err);
			res.status(404).send({msg: err});
		} else {
            console.log('Groceries: list succ:', result.rows);
            res.json(result.rows)
			
		}
	});
};

groceriesCtrl.updateGrocery = async(req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

	client.execute(`UPDATE grocery.fruit_stock set name = '${input.name}', price_p_item = ${input.price} WHERE item_id = '${id}'`,[], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({ message: "Grocery actualizado" });
		}
	});


};

groceriesCtrl.deleteGrocery = async(req, res) => {

	var id = req.params.id;
	client.execute(`DELETE FROM grocery.fruit_stock  WHERE item_id = '${id}'`,[], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({ message: "Grocery eliminado", id: id });
			
		}
	});

};


module.exports = groceriesCtrl;