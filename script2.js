// Detalle de las películas prestadas.

db.getCollection('loan').aggregate([{
        $lookup: {
            from: "client",
            localField: "clientId",
            foreignField: "id",
            as: "client"
        }
    },
    {
        $lookup: {
            from: "video",
            localField: "videoId",
            foreignField: "id",
            as: "video"
        }
    },
    {
        $match: {
            status: "in_progress"
        }

    },
    {
        $project: {
            "id": 1,
            "loanTransaction": 1,
            "videoId": 1,
            "clientId": 1,
            "client.firstName": 1,
            "client.lastName": 1,
            "video.title": 1,
            "video.id": 1
        }
    }

])