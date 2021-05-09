//Para un usuario en particular el historial de cuantas veces alquilo cada película
var userId = 7;

db.getCollection('loan').aggregate([

    {
        $match: {
            clientId: userId
        }
    },
    {

        $group: {
            _id: {
                videoId: "$videoId",
                clientId: "$clientId"
            },
            quantity: {
                $sum: 1
            }
        }

    },
    {
        $lookup: {
            from: "client",
            localField: "_id.clientId",
            foreignField: "id",
            as: "client"
        }
    }, {
        $lookup: {
            from: "video",
            localField: "_id.videoId",
            foreignField: "id",
            as: "video"
        }
    },

    {
        $project: {


            "client.firstName": 1,
            "client.lastName": 1,
            "video.title": 1,
            "video.id": 1,

            "quantity": 1
        }
    }

])