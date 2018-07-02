const logger = require('../../logger');
const moment = require('moment');

const data =  require('./data.json');
module.exports = function(req, res){
    logger.debug(`HTML Generation for ${req.params.id}`);
    // calculate costs
    const total_cost = data.costs.reduce(
        (accumlator, currentValue) => accumlator + currentValue.cost,
        0
    );
    data.total_cost = total_cost.toFixed(2);

    // format todays date
    data.created = moment().format('Do MMM YYYY');

    res.render('invoice', {invoice_data: data});


}
