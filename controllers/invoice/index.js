const logger = require('../../logger');
const data =  require('./data.json');
const moment = require('moment');
const helpers = require('./helpers');
module.exports = function (req,res){

    logger.debug(`HTML Generation for ${req.params.id}`);

    const total_cost = data.costs.reduce(
        (accumlator, currentValue) => accumlator + currentValue.cost,
        0
    );
    data.total_cost = total_cost.toFixed(2);
    console.log(data.total_cost)
    data.created = moment().format('Do MMM YYYY');
    
    res.render('invoice',{
        invoice_data: data,
        helpers:{
            gmap_link: function(postcode){ 
                return helpers.gmap_link(postcode)}
        }
    })


}