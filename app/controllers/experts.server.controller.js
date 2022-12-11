const asyncHandler = require("express-async-handler");
const Experts = require("../models/experts.server.model");


//add experts and check if expert exist
const addexpert = asyncHandler(async (req, res) => {
    let errMessage = [];

    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.experience || !req.body.qualification) {
        errMessage.push("Please fill all the fields");
    }

    if (errMessage.length > 0) {
        res.status(400);
        throw new Error(errMessage);
    }

    const email = req.body.email;
    const expExist = await Experts.findOne({ email });

    if (expExist) {
        res.status(400);
        throw new Error("Expert already exist");
    }


    const addExp = await Experts.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        experience: req.body.experience,
        qualification: req.body.qualification,
        image: req.body.image
    });
    res.status(200).json(addExp);
});

//update expert

const updateExpert = asyncHandler(async (req, res) => {
    const exp = await Experts.findById(req.body.id);

    if (!exp) {
        res.status(400);
        throw new Error("Expert not found");
    }

    const updatedExpert = await Experts.findOneAndUpdate(
        {
            _id: `${req.body.id}`,

        },
        req.body,
        {
            new: true,
        }
    );

    res.status(200).json(updatedExpert);
});

//delete an expert

const deleteexpert = asyncHandler(async (req, res) => {
    const expert = await Experts.findOne({
        email: `${req.body.email}`,
    });

    if (!expert) {
        res.status(400);
        throw new Error("Expert not found");
    }

    await expert.remove();
    res.status(200).json({ _id: req.params.id });
});

const getAllExperts = asyncHandler(async (req, res) => {
    const expert = await Experts.find();
    res.status(200).json(expert);
});


module.exports = {
    addexpert,
    updateExpert,
    deleteexpert,
    getAllExperts
};
