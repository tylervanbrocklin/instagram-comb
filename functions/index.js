//const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
// const runtimeOpts = {
//     timeoutSeconds: 540,
//     memory: '2GB'
// }
//
// exports.generatePDF = functions.storage.object().onFinalize(async (object) => {
//     const fileBucket = object.bucket; // The Storage bucket that contains the file.
//     const filePath = object.name; // File path in the bucket.
//     const contentType = object.contentType; // File content type.
//     const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
//
//     // [START stopConditions]
//     if (!contentType.startsWith('application/zip')) {
//         return console.log('This is not compressed folder.');
//     }
//
//     // Get the file name.
//     const fileName = path.basename(filePath);
//
//     // [UNZIP file]
//
//
//
//     // [START thumbnailGeneration]
//     // Download file from bucket.
//     const bucket = admin.storage().bucket(fileBucket);
//     const tempFilePath = path.join(os.tmpdir(), fileName);
//     const metadata = {
//         contentType: contentType,
//     };
//     await bucket.file(filePath).download({destination: tempFilePath});
//     console.log('Image downloaded locally to', tempFilePath);
//     // Generate a thumbnail using ImageMagick.
//     await spawn('convert', [tempFilePath, '-thumbnail', '200x200>', tempFilePath]);
//     console.log('Thumbnail created at', tempFilePath);
//     // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
//     const thumbFileName = `thumb_${fileName}`;
//     const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);
//     // Uploading the thumbnail.
//     await bucket.upload(tempFilePath, {
//         destination: thumbFilePath,
//         metadata: metadata,
//     });
//     // Once the thumbnail has been uploaded delete the local file to free up disk space.
//     return fs.unlinkSync(tempFilePath);
//     // [END thumbnailGeneration]
// });
// // [END generateThumbnail]