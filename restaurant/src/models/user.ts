export interface User {
  _id: String;
  nick: String;
  email: String;
  role: String;
  purchaseHistory: [{ _id: String; name: String; quantity: Number }];
  activeAccount: Boolean;
}
