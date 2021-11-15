const Clarifai = require('clarifai');
///// You must add your own API key here from Clarifai. /////
const app = new Clarifai.App(
    {
      apiKey: process.env.CLARIFAI_API
    }
  );
/////////////////////////////////////////////////////////////
const handleApiCall = (req, res) => {
    app.models.initModel({
        id: Clarifai.FACE_DETECT_MODEL,
    })
    .then((faceDetectModel) => {
        return faceDetectModel.predict(
          req.body.input
        );
    })
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API"))
}

const handleImageCount = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => {
        res.status(400).json("Unable to get Entries");
    })
}
module.exports = {
    handleImageCount: handleImageCount,
    handleApiCall: handleApiCall
}