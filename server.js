require('./src/services/environment');
const app = require('./src/app');

const port = Environment.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));