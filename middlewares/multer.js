import multer from "multer";

const storage = multer.memoryStorage();


export const foodupload = multer({storage}).single("foodimagefile");
export const singleUpload = multer({ storage }).single("file");
export const driveravatarupload = multer({storage}).fields([{name:"driverimage",maxCount:1},{name:"drivercar",maxCount:1}]);
export const categoryupload = multer({storage}).single("categoryImagefile");
export const resturentupload = multer({storage}).fields([{name:'resturentimagefile',maxCount:1},{name:'resturentgalleryfile',maxCount:1},{name:'humblegiffile',maxCount:1},{name:'storyvideofile',maxCount:1},{name:"rgalleryfile",maxCount:1}])
export const globalsettingupload = multer({storage}).fields([{name:"applicationlogofile"},{name:"placeholderfile",maxCount:1},{name:"faviconimagefile",maxCount:1}]);