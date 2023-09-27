export interface IItemLocalPicture {
  fullSize: {
    pictureName: string;
    width: number;
    height: number;
  };
  previewSize: {
    pictureName: string;
    width: number;
    height: number;
  };
  coverPicture: boolean;
}

export interface IItemLocalJSON {
  id: string;
  catName: string;
  catNameRUS: string;
  catNameDE: string;
  description: string;
  descriptionRUS: string;
  descriptionDE: string;
  picturesRaw: any[];
  pictures: IItemLocalPicture[];
  tags: string[];
  relatedLinks: string[];
  releaseDate: string;
  prices: {
    priceWholesaleUSD: number;
    priceWholesaleEUR: number;
    priceWholesaleRUB: number;
    priceRetailUSD: number;
    priceRetailEUR: number;
    priceRetailRUB: number;
  };
  bigSetData: {
    isBigSet: boolean,
    includesSets: string[],
    partOfSets: string[]
  },
  rating: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface IItemDataLimited {
  id: string;
  catName: string;
  catNameRUS: string;
  prices: {
    priceRetailRUB: number;
  };
  previewPicture: {
    pictureName: string;
    width: number;
    height: number;
  };
}

export const ITEM_DATA_LOCAL_EXAMPLE: IItemLocalJSON = {
  "id": "Stalingrad-3202",
  "catName": "Soviet infantryman",
  "catNameRUS": "",
  "catNameDE": "",
  "description": "",
  "descriptionRUS": "",
  "descriptionDE": "",
  "picturesRaw": [],
  "pictures": [
    {
      "fullSize": { "pictureName": "3202-1.jpg", "width": 739, "height": 479 },
      "previewSize": {
        "pictureName": "3202-0.jpg",
        "width": 210,
        "height": 170
      },
      "coverPicture": true
    },
    {
      "fullSize": { "pictureName": "3202-2.jpg", "width": 681, "height": 598 },
      "previewSize": {
        "pictureName": "3202-02.jpg",
        "width": 85,
        "height": 70
      },
      "coverPicture": false
    },
    {
      "fullSize": { "pictureName": "3202-3.jpg", "width": 690, "height": 607 },
      "previewSize": {
        "pictureName": "3202-03.jpg",
        "width": 83,
        "height": 70
      },
      "coverPicture": false
    },
    {
      "fullSize": { "pictureName": "3202-4.jpg", "width": 741, "height": 630 },
      "previewSize": {
        "pictureName": "3202-04.jpg",
        "width": 88,
        "height": 70
      },
      "coverPicture": false
    },
    {
      "fullSize": {
        "pictureName": "3202-p11.jpg",
        "width": 851,
        "height": 550
      },
      "previewSize": {
        "pictureName": "3202-p01.jpg",
        "width": 77,
        "height": 50
      },
      "coverPicture": false
    },
    {
      "fullSize": {
        "pictureName": "3202-p12.jpg",
        "width": 794,
        "height": 550
      },
      "previewSize": {
        "pictureName": "3202-p02.jpg",
        "width": 72,
        "height": 50
      },
      "coverPicture": false
    },
    {
      "fullSize": {
        "pictureName": "3202-s11.jpg",
        "width": 707,
        "height": 550
      },
      "previewSize": {
        "pictureName": "3202-s01.jpg",
        "width": 60,
        "height": 50
      },
      "coverPicture": false
    }
  ],
  "tags": [],
  "relatedLinks": [],
  "releaseDate": "",
  "prices": {
    "priceWholesaleUSD": 0,
    "priceWholesaleEUR": 0,
    "priceWholesaleRUB": 0,
    "priceRetailUSD": 0,
    "priceRetailEUR": 0,
    "priceRetailRUB": 0
  },
  "bigSetData": { "isBigSet": false, "includesSets": [], "partOfSets": [] },
  "rating": 0
}

export interface IItemsPageProps {
  currentItemsData: IItemDataLimited[];
  currentPage: number;
  totalPages: number;
  currentEnv: "dev" | "prod";
  headerRUS: string;
  route: string;
}