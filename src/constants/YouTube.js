import Axios from "axios";

const toQuery = obj =>
  "?" +
  Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");

class YouTube {
  constructor({ key, base }) {
    this.key = key;
    this.base = base;
    this.currentRequest = { source: { cancel: () => undefined } }; // mock
  }

  request(url) {
    const source = Axios.CancelToken.source();
    const request = Axios.get(url, { cancelToken: source.token });
    this.currentRequest.source.cancel();
    this.currentRequest = { request, source };
    return request;
  }

  search({ q, maxResults = 25, part = "snippet", type = "video" }) {
    const { base, key } = this;
    const url = `${base}/search${toQuery({ q, maxResults, part, type, key })}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then(({ data }) => resolve(data.items))
        .catch(reject);
    });
  }

  getVideo({ id, part = "snippet" }) {
    const { base, key } = this;
    const url = `${base}/videos${toQuery({ id, part, key })}`;

    return new Promise((resolve, reject) => {
      this.request(url)
        .then(({ data }) => {
          if (data.items.length < 1) {
            reject("No items found.");
          } else {
            resolve(data.items.pop());
          }
        })
        .catch(reject);
    });
  }
}

const instance = new YouTube({
  base: "https://www.googleapis.com/youtube/v3",
  key: "AIzaSyBUt250WkkvvAnHu0dHNKOopKYdoQJOUSk"
});

export default instance;
