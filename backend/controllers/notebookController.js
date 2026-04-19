// import notebookModel from '../models/notebookModel.js';

// // Create Notebook
// const createNotebook = async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         const userId = req.body.userId;

//         if (!title) {
//             return res.json({ success: false, message: 'Title is required' });
//         }

//         const newNotebook = new notebookModel({
//             userId,
//             title,
//             description: description || ''
//         });

//         await newNotebook.save();
//         res.json({ success: true, notebook: newNotebook });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Get All Notebooks
// const getNotebooks = async (req, res) => {
//     try {
//         const userId = req.body.userId;
//         const notebooks = await notebookModel.find({ userId });
//         res.json({ success: true, notebooks });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Update Notebook
// const updateNotebook = async (req, res) => {
//     try {
//         const { notebookId, title, description } = req.body;
//         const userId = req.body.userId;

//         if (!notebookId) {
//             return res.json({ success: false, message: 'Notebook ID is required' });
//         }

//         const notebook = await notebookModel.findOne({ _id: notebookId, userId });
//         if (!notebook) {
//             return res.json({ success: false, message: 'Notebook not found' });
//         }

//         if (title) notebook.title = title;
//         if (description !== undefined) notebook.description = description;

//         await notebook.save();
//         res.json({ success: true, notebook });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Delete Notebook
// const deleteNotebook = async (req, res) => {
//     try {
//         const { notebookId } = req.body;
//         const userId = req.body.userId;

//         if (!notebookId) {
//             return res.json({ success: false, message: 'Notebook ID is required' });
//         }

//         const notebook = await notebookModel.findOneAndDelete({ _id: notebookId, userId });
//         if (!notebook) {
//             return res.json({ success: false, message: 'Notebook not found' });
//         }

//         res.json({ success: true, message: 'Notebook deleted successfully' });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// export { createNotebook, getNotebooks, updateNotebook, deleteNotebook };

import notebookModel from "../models/notebookModel.js";

// ➤ Create Notebook (max 40)
export const createNotebook = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { name } = req.body;

    const count = await notebookModel.countDocuments({ userId });
    if (count >= 40) {
      return res.json({ success: false, message: "Max 40 notebooks allowed" });
    }

    const notebook = new notebookModel({
      userId,
      name,
      order: count + 1
    });

    await notebook.save();

    res.json({ success: true, notebook });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ➤ Get all notebooks of user
export const getNotebooks = async (req, res) => {
  try {
    const userId = req.body.userId;

    const notebooks = await notebookModel
      .find({ userId })
      .sort({ order: 1 });

    res.json({ success: true, notebooks });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ➤ Delete Notebook
export const deleteNotebook = async (req, res) => {
  try {
    const { notebookId } = req.body;

    await notebookModel.findByIdAndDelete(notebookId);

    res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};