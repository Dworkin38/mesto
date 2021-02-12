export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._elementUserName = document.querySelector(this._userNameSelector);
    this._elementUserInfo = document.querySelector(this._userInfoSelector);
    this._elementUserAvatar = document.querySelector(this._userAvatarSelector);
  }

  getUserInfo() {
    return { profileName: this._userName, profileJob: this._userInfo };
  }

  getUserId() {
    return this._userId; 
  }

  setUserInfo(data) {
    this._userId = data.userId;
    this._userName = data.userName;
    this._userInfo = data.userInfo;
    this._userAvatarLink = data.userAvatarLink;
    this._elementUserName.textContent = this._userName;
    this._elementUserInfo.textContent = this._userInfo;
    this._elementUserAvatar.src = this._userAvatarLink;
  }
}