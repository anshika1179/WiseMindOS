// import mongoose from 'mongoose';

// const pageSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
//     notebookId: { type: mongoose.Schema.Types.ObjectId, ref: 'notebook', required: true },
//     title: { type: String, required: true },
//     content: { type: String, default: '' },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// }, { minimize: false });

// const pageModel = mongoose.models.page || mongoose.model('page', pageSchema);

// export default pageModel;


import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },

    notebookId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'notebook', 
        required: true 
    },

    title: { type: String, default: 'Untitled Page' },

    content: { type: String, default: '' },

    // Maintain order (Page 1, Page 2...)
    order: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

}, { minimize: false });

const pageModel = mongoose.models.page || mongoose.model('page', pageSchema);

export default pageModel;