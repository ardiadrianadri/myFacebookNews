export enum FaceBookActionTypes {
  LOGIN,
  LOGOUT,
  PROFILE,
  IDENTIFY,
  GET_POST,
}

export enum FaceBookStateTypes {
  CONNECTED,
  NOT_CONNECTED,
  IDENTIFIED,
  ERROR
}

export interface FacebookState {
  state: FaceBookStateTypes;
  data?: any;
}

export interface FacebookAction {
  type: FaceBookActionTypes;
  payload?: any;
}

export interface FaceBookImage {
  height: number;
  src: string;
  width: number;
}

export interface FaceBookMedia {
  image: FaceBookImage;
}

export interface AttachmentData {
  type: string;
  url: string;
  media: FaceBookMedia;
}

export interface Attachments {
  data: AttachmentData[];
}

export interface FacebookData {
  full_picture: string;
  message: string;
  description: string;
  attachments?: Attachments;
}

export interface IndexesArticle {
  line: number;
  index: number;
}
