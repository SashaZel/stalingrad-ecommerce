import imageSize from "image-size";
import { readdir, readFile, writeFile } from "node:fs/promises";

const ITEM_DRAFT = {
  id: "",
  catName: "Soviet infantryman",
  catNameRUS: "",
  catNameDE: "",
  description: "",
  descriptionRUS: "",
  descriptionDE: "",
  picturesRaw: [],
  pictures: [],
  tags: [],
  relatedLinks: [],
  releaseDate: "",
  prices: {
    priceWholesaleUSD: 10,
    priceWholesaleEUR: 9,
    priceWholesaleRUB: 561,
    priceRetailUSD: 17,
    priceRetailEUR: 14,
    priceRetailRUB: 710,
  },
  rating: 0,
};

function getPictureSize(folderPictures, file) {
  return imageSize(folderPictures + file);
}

async function getFileNames(folder) {
  try {
    const files = await readdir(folder);
    return files;
  } catch (err) {
    console.error("Error @getFileNames() in folder ", folder, err);
    return null;
  }
}

async function getAlreadyExistData(folderOutput) {
  const folderOutputFiles = await getFileNames(folderOutput);
  if (!folderOutputFiles) return;
  const alreadyExistData = {};
  try {
    for (const file of folderOutputFiles) {
      try {
        const contents = await readFile(`${folderOutput}${file}`, {
          encoding: "utf8",
        });
        const itemData = JSON.parse(contents);
        alreadyExistData[itemData.id] = itemData;
        // clear all pictures data
        alreadyExistData[itemData.id].pictures = [];
      } catch (error) {
        console.error(
          "Error @getAlreadyExistData @readFile file name ",
          file,
          error
        );
      }
    }
    return alreadyExistData;
  } catch (error) {
    console.error("Error @getAlreadyExistData in folder ", folderOutput, error);
    return null;
  }
}

function sortPictures(currentItem) {
  const fullSizeImages = [];
  const previewImages = [];
  currentItem.picturesRaw.map((picture) => {
    const nameSuffics = picture.pictureName.split("-")[1];
    if (
      nameSuffics[0] === "0" ||
      nameSuffics.slice(0, 2) === "s0" ||
      nameSuffics.slice(0, 2) === "p0"
    ) {
      previewImages.push(picture);
    } else {
      fullSizeImages.push(picture);
    }
  });
  fullSizeImages.map((pictureFullSize) => {
    const fullSuffics = pictureFullSize.pictureName.split("-")[1];
    let coverPicture = false;
    let preview;
    if (!Number.isNaN(Number(fullSuffics[0]))) {
      preview = previewImages.find(
        (prv) => prv.pictureName.split("-")[1].slice(1) === fullSuffics
      );
    }
    if (fullSuffics[0] === "1") {
      coverPicture = true;
      const nameWithoutOne = pictureFullSize.pictureName.split("-1");
      preview = previewImages.find((prv) => {
        const namePrvWithoutZero = prv.pictureName.split("-0");
        return (
          nameWithoutOne[0] === namePrvWithoutZero[0] &&
          nameWithoutOne[1] === namePrvWithoutZero[1]
        );
      });
    }
    if (fullSuffics.slice(0, 2) === "p1") {
      const fullNameWithoutP = pictureFullSize.pictureName.split("-p1");
      preview = previewImages.find((prv) => {
        const previewNameWithoutP = prv.pictureName.split("-p0");
        return (
          fullNameWithoutP[0] === previewNameWithoutP[0] &&
          fullNameWithoutP[1] === previewNameWithoutP[1]
        );
      });
    }
    if (fullSuffics.slice(0, 2) === "s1") {
      const fullNameWithoutP = pictureFullSize.pictureName.split("-s1");
      preview = previewImages.find((prv) => {
        const previewNameWithoutP = prv.pictureName.split("-s0");
        return (
          fullNameWithoutP[0] === previewNameWithoutP[0] &&
          fullNameWithoutP[1] === previewNameWithoutP[1]
        );
      });
    }

    const pictureDraft = {
      fullSize: pictureFullSize,
      previewSize: preview,
      coverPicture,
    };
    currentItem.pictures.push(pictureDraft);
  });
  currentItem.picturesRaw = [];
  return currentItem;
}

export async function getPicturesData(folderPictures, folderOutput, brand) {
  if (!folderPictures || !folderOutput || !brand) {
    console.error("Error @getPicturesData(): missed args");
    return;
  }
  const files = await getFileNames(folderPictures);
  const dataReady = await getAlreadyExistData(folderOutput);

  if (!files || !dataReady) return;

  files.forEach((file) => {

    const idDraft = `${brand}-${file.split("-")[0]}`;

    if (!dataReady[idDraft]) {
      dataReady[idDraft] = JSON.parse(JSON.stringify(ITEM_DRAFT));
      dataReady[idDraft].id = idDraft;
    }

    const imageSize = getPictureSize(folderPictures, file);
    const pictureDraft = {
      pictureName: file,
      width: imageSize.width,
      height: imageSize.height,
    };
    dataReady[idDraft].picturesRaw.push(pictureDraft);
    
  });

  for (const item in dataReady) {
    const currentItem = dataReady[item];
    const currentItemSortedPictures = sortPictures(currentItem);
    const currentItemJSON = JSON.stringify(currentItemSortedPictures);
    const JSONname = `${folderOutput}${currentItemSortedPictures.id}.json`;
    try {
      await writeFile(JSONname, currentItemJSON);
      console.log("file ", JSONname, " wrote success");

    } catch(error) {
      console.error('Error @getPicturesData() @writeFile file name: ', JSONname, error);
    }
  }
}
