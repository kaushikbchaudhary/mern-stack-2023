import mongoose from 'mongoose';

const connect = async function () {
    await mongoose.connect(
        'mongodb+srv://kaushikchaudhary730:Mern22213@cluster0.7oswpll.mongodb.net/?retryWrites=true&w=majority'
    );
    console.log('MongoDB connection is successful');
};

export default connect;