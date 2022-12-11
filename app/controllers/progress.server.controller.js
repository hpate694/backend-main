const asyncHandler = require("express-async-handler");
const User = require("../models/user.server.model");
const Progress = require("../models/progress.server.model");
const Plan = require("../models/plan.server.model");
const Diet = require("../models/diet.server.model");
const Exercise = require("../models/exercise.server.model");
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');
const { db } = require("../models/user.server.model");

const addProgress = asyncHandler(async (req, res) => {

    //const Fuser = req.body.user;
    const uid = await User.findById(req.body.user);
    // console.log(uid + " << User");

    if (!uid) {
        res.status(400);
        throw new error("User not found");
    }

    const prog = await Progress.create({
        weight: req.body.weight,
        FollowExercise: req.body.FollowExercise,
        FollowDiet: req.body.FollowDiet,
        ExerciseTime: req.body.ExerciseTime,
        user: req.body.user
    })

    res.status(200).json(prog);

});

//get all the recorded progress

const getallProgress = asyncHandler(async (req, res) => {

    const uId = await User.findById(req.body.user);

    if (!uId) {
        res.status(400);
        throw new error("No records for this user");
    }

    const getProgress = await Progress.find({
        user: { _id: req.body.user },
    });
    res.status(200).json(getProgress);
});

const generateProgressReport = asyncHandler(async (req, res) => {
    const progress1 = await Progress.find({
        user: { _id: req.body.user },
    });

    const startDate = new Date(Math.max.apply(null, progress1.map(function (e) {
        return new Date(e.createdAt);
    })));

    const endDate = new Date(Math.min.apply(null, progress1.map(function (e) {
        return new Date(e.createdAt);
    })));

    const dbUser = (await User.findById(req.body.user)).firstName;

    const plan = await Plan.findOne({
        user: { _id: req.body.user },
    });

    const dietName = (await Diet.findOne({ _id: plan.diet })).name;

    const exercise = (await Exercise.findOne({ _id: plan.exercise })).name;

    progress1.sort(function (x, y) {
        return x.createdAt - y.createdAt;
    });

    const initialWeight = progress1[0].weight;
    const currentWeight = progress1.pop().weight;

    const fileName = 'progress-report.pdf';
    pdf.create(pdfTemplate({
        "name": dbUser,
        "exPlan": exercise,
        "diPlan": dietName,
        "initialWeight": initialWeight,
        "currentWeight": currentWeight,
        "startDate": startDate.toISOString().slice(0, 10),
        "endDate": endDate.toISOString().slice(0, 10)
    }), {}).toFile(fileName, (err, response) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.sendFile(response.filename);
    });
});

module.exports = { addProgress, getallProgress, generateProgressReport };