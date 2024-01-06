use('assessment_system');

db.getCollection('student').aggregate([
    {
        '$match': {
            'user_id': ObjectId("6575f25e2a9cb035fe3ac72d")
        }
    },
    {
        '$lookup': {
            'from': 'assessment_record',
            'localField': '_id',
            'foreignField': 'student_id',
            'as': 'assessment_record_detail'
        }
    },
    { "$unwind": "$assessment_record_detail" },
    {
        '$lookup': {
            'from': 'assessment',
            'localField': 'assessment_record_detail.assessment_id',
            'foreignField': '_id',
            'as': 'assessment_detail'
        }
    },
    { "$unwind": "$assessment_detail" },
    {
        '$lookup': {
            'from': 'assessment_type',
            'localField': 'assessment_detail.assessment_type',
            'foreignField': '_id',
            'as': 'assessment_type'
        }
    },
    {
        '$project': {
            '_id': 0,
            "roll_no": 1,
            "assessment_record_detail.status": 1,
            "assessment_record_detail.last_changed": 1,
            "assessment_detail.title": 1,
            "assessment_type.assessment_type": 1,
        }
    },
    {
        "$sort": {
            "assessment_record_detail.last_changed": 1 
        }
    }
]);



// db.getCollection('assessment_record').aggregate([
//     { "$match": { "assessment_id": ObjectId("657e884061aebb787ae5e059") } },
//     { "$lookup": { "from": "student", "localField": "student_id", "foreignField": "_id", "as": "student_info" } },
//     { "$unwind": "$student_info" },
//     { "$lookup": { "from": "user", "localField": "student_info.user_id", "foreignField": "_id", "as": "user_info" } },
//     { "$unwind": "$user_info" },
//     {
//         "$project": {
//             "_id":1,
//             "status": 1,
//             "last_changed":1,
//             "student_info.roll_no": 1,
//             "user_info.user_name": 1,
//         }
//     },
// ]);


