const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'major': '컴퓨터공학과',
            'gender': '남자',
            'charge': '0'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '손우진',
            'major': '컴퓨터소프트웨어학과',
            'gender': '남자',
            'charge': '100000000'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이순신',
            'major': '전자공학과',
            'gender': '남자',
            'charge': '2000'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));