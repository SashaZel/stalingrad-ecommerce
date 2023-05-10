export interface IItemPictures {
   name: string;
   width: number;
   height: number;
}

export interface IItemInJSON {
  id: string;
  name: string;
  nameRus: string;
  tags: string[];
  releaseDate: string;
  pictures: IItemPictures[] 
}