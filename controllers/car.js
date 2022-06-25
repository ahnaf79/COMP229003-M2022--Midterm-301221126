// create a reference to the model
let CarModel = require('../models/car');

// Gets all cars from the Database and renders the page to list them all.
module.exports.carList = function(req, res, next) {


    CarModel.find((err, carsList) => {

        if (err) {
            return console.error(err);
        } else {
            res.render('cars/list', {
                title: 'Cars List',
                CarsList: carsList,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}


// Gets a car by id and renders the details page.
module.exports.details = (req, res, next) => {

    let id = req.params.id;

    CarModel.findById(id, (err, carToShow) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('cars/details', {
                title: 'Car Details',
                car: carToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {

    res.render('cars/add_edit', {
        title: 'Add a new Car',
        action: '/cars/add',
        car: {
            make: '',
            model: '',
            year: '',
            kilometers: '',
            doors: '',
            seats: '',
            color: '',
            price: '',
        }
    });

}

// Processes the data submitted from the Add form to create a new car
module.exports.processAddPage = (req, res, next) => {


    console.log('smth', req.body);

    var car = new CarModel({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        kilometers: req.body.kilometers,
        doors: req.body.doors,
        seats: req.body.seats,
        color: req.body.color,
        price: req.body.price,
    });

    // Save the new model instance, passing a callback
    car.save(function(err) {
        console.log(err)
        if (err) return handleError(err);
        // saved!
    });

    res.redirect('/cars/list');

}

// Gets a car by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {

    let id = req.params.id;

    CarModel.findById(id, (err, existingCar) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('cars/add_edit', {
                title: 'Edit this Car',
                action: `/cars/edit/${id}`,
                car: {
                    make: existingCar.make,
                    model: existingCar.model,
                    year: existingCar.year,
                    kilometers: existingCar.kilometers,
                    doors: existingCar.doors,
                    seats: existingCar.seats,
                    color: existingCar.color,
                    price: existingCar.price,
                }
            });
        }
    });

}

// Processes the data submitted from the Edit form to update a car
module.exports.processEditPage = (req, res, next) => {

    console.log('hello')

    CarModel.findById(req.params.id, (err, existingCar) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {

            existingCar.updateOne({
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                kilometers: req.body.kilometers,
                doors: req.body.doors,
                seats: req.body.seats,
                color: req.body.color,
                price: req.body.price,
            });

            existingCar.save()

        }
    });

    CarModel.findByIdAndUpdate(req.params.id, {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            kilometers: req.body.kilometers,
            doors: req.body.doors,
            seats: req.body.seats,
            color: req.body.color,
            price: req.body.price,
        },
        function(err) {
            if (err) {
                console.log(err)
            }

            console.log("Successful edit");
        }
    );

    res.redirect('/cars/list');

}

// Deletes a car based on its id.
module.exports.performDelete = (req, res, next) => {
    console.log(req.params.id);

    CarModel.deleteOne({ id: req.params.id }, function(err) {
        if (err) {
            console.log(err)
        }

        console.log("Successful deletion");
    });

    res.redirect(req.get('referer'));

}

// 
//     make: String,
//     model: String,
//     year: Number,
//     kilometers: Number,
//     doors: Number,
//     seats: Number,
//     color: String,
//     price: Number        
// 

// for testing purposes
module.exports.myCreateCarTesting = (req, res, next) => {

    var car = new CarModel({
        make: 'Ford',
        model: 'R3d2',
        year: 1992,
        kilometers: 5000,
        doors: 4,
        seats: 2,
        color: 'Black',
        price: 3090.65,
    });

    // Save the new model instance, passing a callback
    car.save(function(err) {
        if (err) return handleError(err);
        // saved!
    });

}