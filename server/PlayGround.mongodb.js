use('assessment_system');

db.getCollection('assessment_record').aggregate([
    { "$match": { "assessment_id": ObjectId("657e884061aebb787ae5e059") } },
    { "$lookup": { "from": "student", "localField": "student_id", "foreignField": "_id", "as": "student_info" } },
    { "$unwind": "$student_info" },
    { "$lookup": { "from": "user", "localField": "student_info.user_id", "foreignField": "_id", "as": "user_info" } },
    { "$unwind": "$user_info" },
    {
        "$project": {
            "_id":1,
            "status": 1,
            "last_changed":1,
            "student_info.roll_no": 1,
            "user_info.user_name": 1,
        }
    },
]);

// pipeline = [
//     { "$match": { "course_id": ObjectId("6575ef842a9cb035fe3ac6ee") } },
//     {
//         '$project': {
//             '_id': 1,
//             'semester_number': 1
//         }
//     },
// ];
// db.getCollection('semester').aggregate(pipeline);
