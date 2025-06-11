const Goal = require('../models/Goal');
// Krijo një qëllim të ri
exports.createGoal = async (req, res) => {
    try {
        const { userId, name, targetAmount, currentAmount, deadline } = req.body;
        if (!userId || !name || !targetAmount || !deadline) {

            return res.status(400).json({
                message: 'Ju lutem plotësoni të gjitha fushat e nevojshme.' });
}
const goal = new Goal({
                    userId,
                    name,
                    targetAmount,
                    currentAmount: currentAmount || 0,
                    deadline
                });
            await goal.save();
            res.status(201).json(goal);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Gabim gjatë krijimit të qëllimit.' });
        }
    };
    // Merr të gjitha qëllimet e një përdoruesi
    exports.getGoalsByUser = async (req, res) => {
        try {
            const { userId } = req.query;
            if (!userId) {
                return res.status(400).json({ message: 'UserId mungon.' });
            }
            const goals = await Goal.find({ userId }).sort({ deadline: 1 });
            res.json(goals);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Gabim gjatë marrjes së qëllimeve.' });
        }
    };
    // Përditëso qëllimin me ID
    exports.updateGoal = async (req, res) => {
        try {
            const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!updatedGoal) {
                return res.status(404).json({ message: 'Qëllimi nuk u gjet.' });
            }
            res.json(updatedGoal);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Gabim gjatë përditësimit të qëllimit.' });
        }
    };
    // Fshij qëllimin me ID
    exports.deleteGoal = async (req, res) => {
        try {
            const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
            if (!deletedGoal) {
                return res.status(404).json({ message: 'Qëllimi nuk u gjet.' });
            }
            res.json({ message: 'Qëllimi u fshi me sukses.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Gabim gjatë fshirjes së qëllimit.' });
        }
    };