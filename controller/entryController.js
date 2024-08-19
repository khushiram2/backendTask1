import Entry from "../models/entryModel.js";


export const getAllEntriesForListView = async (req, res) => {
  try {
    const { userId, start, end } = req.query
    console.log(start + " " + end)
    const listViewData = await Entry.find({ userId: userId, date: { $lte: new Date(end), $gte: new Date(start) } }).populate("categoryId")
    res.status(200).send({ message: "data got sucessfully", data: listViewData })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}

export const getAllEntriesForPieChart = async (req, res) => {
  try {
    const { userId, start, end } = req.query
    const pipeline = [
      {
        $match: {
          userId: userId,
          date: { $lte: end, $gte: start }
        }

      },

      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $group: {
          _id: '$category.name',
          totalAmount: { $sum: { $toDouble: '$amount' } }
        }
      },
      {
        $sort: { totalAmount: -1 }
      }
    ];

    const results = await Entry.aggregate(pipeline);
    res.status(200).send({ data: results[0] })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
export const getAllEntriesForLineChart = async (req, res) => {
  try {
    const { userId, start, end } = req.query
    const entries = await Entry.aggregate([
      {
        $match: {
          userId: userId,
          date: { $gte: new Date(start), $lte: new Date(end) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" }
          },
          totalAmount: { $sum: { $toDouble: "$amount" } }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
      }
    ]);

    res.status(200).send({ data: entries[0] });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
export const updateSingleEntry = async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}


export const createNewEntry = async (req, res) => {
  try {
    const { userId, amount, categoryId, date, description } = req.body
    console.log(req.body)
    await Entry.create({ userId, amount, description, date, categoryId })
    res.status(200).send({ message: "new entry has been made" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
export const deleteSingleEntry = async (req, res) => {
  try {

  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "internal server error" })
  }
}
