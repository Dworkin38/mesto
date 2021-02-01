export default class UserInfo {
  constructor({ userNameSelector, userInfoSelector }) {
    this.userNameSelector = userNameSelector;
    this.userInfoSelector = userInfoSelector;
    this.userName = document.querySelector(this.userNameSelector);
    this.userInfo = document.querySelector(this.userInfoSelector);
  }

  getUserInfo() {
    const user = { profileName: this.userName.textContent, profileJob: this.userInfo.textContent }
    return user;
  }

  setUserInfo(userName, userInfo) {
    this.userName.textContent = userName;
    this.userInfo.textContent = userInfo;
  }
}