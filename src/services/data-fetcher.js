import axios from 'axios';

class DataFetcher {
  instance;
  // https://api.github.com/repos/osrsbox/osrsbox-db/contents/docs
  // This can be used to get content of the docs folder,
  // mostly useful to get sha of monsters-complete.json

  // https://api.github.com/repos/osrsbox/osrsbox-db/contents/docs/items-json-slot
  // This can be used to get content of the items-json-slot folder,
  // used to get the sha's of all the slot jsons

  // https://api.github.com/repos/osrsbox/osrsbox-db/git/blobs/5fcffa25bf2956d85968ec8f9c5bd0f1e8904398

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com/repos/osrsbox/osrsbox-db',
      headers: {},
    });
  }

  fetchContents(path) {
    return this.instance.get(`/contents/${path}`);
  }

  fetchBlob(sha) {
    return this.instance.get(`/git/blobs/${sha}`);
  }

  // fetch "docs" content
  fetchDocsContents() {
    return this.fetchContents('docs');
  }

  // fetch "items-json-slot" content
  fetchItemJsonSlotContents() {
    return this.fetchContents('docs/items-json-slot');
  }

  fetchPlayerHiScores(name) {
    return axios.get('https://api.osrs.equipment/api/hiscore',
      {
        params: {
          name,
        },
      });
  }
}

export default new DataFetcher();
