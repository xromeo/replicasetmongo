//Ranking de las películas mas prestadas.


db.getCollection('loan').aggregate([{

        $group: {
            _id: {
                videoId: "$videoId"

            },
            quantity: {
                $sum: 1
            }
        }

    },
    {
        $sort: {
            quantity: -1
        }
    },
    {
        $limit: 10
    },
    {
        $lookup: {
            from: "video",
            localField: "_id.videoId",
            foreignField: "id",
            as: "video"
        }
    },

    {
        $project: {
            "video.title": 1,
            "video.id": 1,

            "quantity": 1
        }
    }

])