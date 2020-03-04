const Model = require('../models/note.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "note cannot be empty"
        });
    }
    const note = new Model({
        title: req.body.title || "untitle notes",
        content: req.body.content
    });
    Model.note.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occur while create the note"
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Model.note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find note and update it with the request body
    Model.note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error updating note with id " + req.params.noteId
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};

exports.register = (req, res) => {
    checkUser = null;
    const payload = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        status: req.body.status
    };
    if (!req.body.email) {
        return res.status(400).send({
            message: "email is missing"
        });
    }
    // checkUser = Model.user.findOne({},{ email: req.body.email, _id : 0 });
    // if (Model.user.findOne(payload.email) == true )

    
    
    if (Model.user.findOne(payload.email) == true ) {
        const note = new Model.user(payload);
        note.save().then(data => {
            res.send({
                message: "data successfully inserted!",
                status: 1
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occur while create the note",
                status: 1,
            });
        });
    } else {
        return res.status(400).send({
            message : "ERROR! email already exist"
        });
    }

};

exports.getAlluser = (req, res) => {
    Model.user.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.login = (req, res) => {
    const payload = {
        email: req.body.email,
        password: req.body.password
    };
    if (!payload.email || !payload.password) {
        res.send({
            message: "email or password is required"
        });
    }
    Model.user.find(payload)
        .then(result => {
            if (result.length > 0) {
                res.send({
                    message: 'successfully login'
                });
            } else {
                res.send({
                    message: "invalid credentials"
                });
            }

        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            });
        });
};


