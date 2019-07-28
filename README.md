# TensorShade ✋🏻✋✋🏽✋🏿
A machine learning app that uses Tensorflow, React, and Parcel to best match makeup foundation shades from various beauty brands to images of skin tones.

I used the dataset from [@the-pudding](@the-pudding) for their [*Beauty Brawl*](https://pudding.cool/2018/06/makeup-shades/) essay published in June 2018, which explores how inclusive beauty brands are around the world.

To run TensorShade, simply clone or fork this repo, then `cd` into the project folder and type `npm start` in your terminal to build and deploy the app in the browser.

Alternatively, you can view the deployed app here: [https://tensorshade.kaylakremer.now.sh/](https://tensorshade.kaylakremer.now.sh/)

## Dataset
[https://github.com/the-pudding/data/tree/master/makeup-shades](https://github.com/the-pudding/data/tree/master/makeup-shades)

> Data representing the shades of foundation offered by a variety of beauty brands around the world.

### Note
I modified the data to include the shade name of each foundation by adding a `shade` key in `shades.json`. This was done to make TensorShade more useful when predicting foundation shade matches to photos of skin. Because I manually had to look up each beauty brand's foundation shades, there may be inaccuracies. Furthermore, some brands have changed their foundation shade range or some brands no longer exist since the original data was collected. In the event that I could not find or match up a beauty brand's foundation with the original data, I omitted it from `shades.json`.

## Resources
[https://www.tensorflow.org/js/](https://www.tensorflow.org/js/)

[https://reactjs.org/](https://reactjs.org/)

[https://parceljs.org/](https://parceljs.org/)
