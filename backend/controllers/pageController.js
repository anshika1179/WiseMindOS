// import pageModel from '../models/pageModel.js';

// // Create Page
// const createPage = async (req, res) => {
//     try {
//         const { notebookId, title, content } = req.body;
//         const userId = req.body.userId;

//         if (!notebookId || !title) {
//             return res.json({ success: false, message: 'Notebook ID and title are required' });
//         }

//         const newPage = new pageModel({
//             userId,
//             notebookId,
//             title,
//             content: content || ''
//         });

//         await newPage.save();
//         res.json({ success: true, page: newPage });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Get Pages by Notebook
// const getPagesByNotebook = async (req, res) => {
//     try {
//         const { notebookId } = req.body;
//         const userId = req.body.userId;

//         if (!notebookId) {
//             return res.json({ success: false, message: 'Notebook ID is required' });
//         }

//         const pages = await pageModel.find({ userId, notebookId });
//         res.json({ success: true, pages });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Get All Pages
// const getAllPages = async (req, res) => {
//     try {
//         const userId = req.body.userId;
//         const pages = await pageModel.find({ userId });
//         res.json({ success: true, pages });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Update Page
// const updatePage = async (req, res) => {
//     try {
//         const { pageId, title, content } = req.body;
//         const userId = req.body.userId;

//         if (!pageId) {
//             return res.json({ success: false, message: 'Page ID is required' });
//         }

//         const page = await pageModel.findOne({ _id: pageId, userId });
//         if (!page) {
//             return res.json({ success: false, message: 'Page not found' });
//         }

//         if (title) page.title = title;
//         if (content !== undefined) page.content = content;
//         page.updatedAt = new Date();

//         await page.save();
//         res.json({ success: true, page });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // Delete Page
// const deletePage = async (req, res) => {
//     try {
//         const { pageId } = req.body;
//         const userId = req.body.userId;

//         if (!pageId) {
//             return res.json({ success: false, message: 'Page ID is required' });
//         }

//         const page = await pageModel.findOneAndDelete({ _id: pageId, userId });
//         if (!page) {
//             return res.json({ success: false, message: 'Page not found' });
//         }

//         res.json({ success: true, message: 'Page deleted successfully' });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// };

// export { createPage, getPagesByNotebook, getAllPages, updatePage, deletePage };


import pageModel from "../models/pageModel.js";
import notebookModel from "../models/notebookModel.js";

// ➤ Create Page (max 100 per notebook)
export const createPage = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { notebookId } = req.body;

    const notebook = await notebookModel.findById(notebookId);
    if (!notebook) {
      return res.json({ success: false, message: "Notebook not found" });
    }

    if (notebook.pageCount >= 100) {
      return res.json({ success: false, message: "Max 100 pages allowed" });
    }

    const page = new pageModel({
      userId,
      notebookId,
      title: `Page ${notebook.pageCount + 1}`,
      order: notebook.pageCount + 1
    });

    await page.save();

    // update page count
    notebook.pageCount += 1;
    await notebook.save();

    res.json({ success: true, page });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ➤ Get pages of a notebook
export const getPages = async (req, res) => {
  try {
    const { notebookId } = req.body;

    const pages = await pageModel
      .find({ notebookId })
      .sort({ order: 1 });

    res.json({ success: true, pages });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ➤ Update Page Content (max 10KB)
export const updatePage = async (req, res) => {
  try {
    const { pageId, content } = req.body;

    if (content.length > 10000) {
      return res.json({ success: false, message: "Max 10KB content allowed" });
    }

    const page = await pageModel.findByIdAndUpdate(
      pageId,
      {
        content,
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json({ success: true, page });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ➤ Delete Page
export const deletePage = async (req, res) => {
  try {
    const { pageId, notebookId } = req.body;

    await pageModel.findByIdAndDelete(pageId);

    // decrease page count
    const notebook = await notebookModel.findById(notebookId);
    if (notebook && notebook.pageCount > 0) {
      notebook.pageCount -= 1;
      await notebook.save();
    }

    res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};