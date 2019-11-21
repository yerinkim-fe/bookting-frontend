let SERVER_URL;
if (process.env.REACT_APP_NODE_ENV === 'development') {
  SERVER_URL = 'http://localhost:8000';
} else {
  SERVER_URL = 'https://booktingapi.yerinsite.com';
}

export const config = {
  SERVER_URL
};
