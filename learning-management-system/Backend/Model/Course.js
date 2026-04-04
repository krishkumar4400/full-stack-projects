import mongoose, { Schema } from 'mongoose';

const courseSchema = new Schema ({
    courseTitle: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true,

    },
    

})

const courseModel = mongoose.model.Course || mongoose.model("Course", courseSchema);

export default courseModel;