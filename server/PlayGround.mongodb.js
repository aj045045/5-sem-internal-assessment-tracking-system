use('assessment_system');

db.getCollection('student').aggregate([
    { "$match": { "semester_id": ObjectId("656b01f51efc3ddb27eab422") } },
    { "$lookup": { "from": "user", "localField": "user_id", "foreignField": "_id", "as": "user_info" } },
    { "$unwind": "$user_info" },
    {
        "$project": {
            "user_info._id":1,
            "user_info.user_name": 1,
            "user_info.email_id":1,
            "allotment_year": 1,
            "roll_no": 1,
            "_id":0
        }
    },
]);
// pipeline = [
//     {
//             "document_count": {"$sum": 1}
//         }
//     }
// ]
// db.createCollection('semester').aggregate(pipeline);
