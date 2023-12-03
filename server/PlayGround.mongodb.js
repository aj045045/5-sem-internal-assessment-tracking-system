use('assessment_system');

// db.getCollection('subject').aggregate([
//     { "$match": { "semester_id": ObjectId("656a8f4b972d502ff9d96c55") } },
//     { "$lookup": { "from": "user", "localField": "faculty_id", "foreignField": "_id", "as": "user_info" } },
//     { "$unwind": "$user_info" },
//     {
//         "$project": {
//             "_id":1,
//             "subject_name": 1,
//             "credit":1,
//             "type": 1,
//             "code": 1,
//             "subject_plan": 1,
//             "user_info.user_name":1
//         }
//     },
// ]);
pipeline = [
    {
        "$group": {
            "_id":None,
            "document_count": {"$sum": 1}
        }
    }
]
db.createCollection('semester').aggregate(pipeline);
