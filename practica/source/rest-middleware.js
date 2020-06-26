const debug = require("debug")("rest-middleware");
const express = require('express');
const router = express.Router();

const { getAuthors, getAuthorsCount, getPosts, getPostsCount } = require("./common.js");

router.get('/authors/:id?', async (req, res) => {
    const id = req.params.id;
    const limit = req.query.limit || 20;
    const offset = req.query.offset;

    try {
        debug(`/authors${id && "/"+id}`);
        const list = await getAuthors(req.pool, {id, limit, offset});
        const [count] = await getAuthorsCount(req.pool);
        res.status(200).send({ list, count: count.count });
    }
    catch(e) {
        console.error(`/authors${id && "/"+id} | error =>`, e);
        res.status(500).send(e);
    }
});

router.get('/authors-list/:id?', async (req, res) => {
    const id = req.params.id;
    const limit = req.query.limit || 20;
    const offset = req.query.offset;

    try {
        debug(`/authors-list${id && "/"+id}`);
        const list = await getAuthors(req.pool, {id, limit, offset});
        res.status(200).send({ list });
    }
    catch(e) {
        console.error(`/authors-list${id && "/"+id} | error =>`, e);
        res.status(500).send(e);
    }
});

router.get('/authors-count', async (req, res) => {
    try {
        debug(`/authors-count`);
        const [count] = await getAuthorsCount(req.pool);
        res.status(200).send({ count: count.count });
    }
    catch(e) {
        console.error(`/authors-count| error =>`, e);
        res.status(500).send(e);
    }
});

router.get('/posts/:id?', async (req, res) => {
    const id = req.params.id;
    const limit = req.query.limit || 20;
    const offset = req.query.offset;

    try {
        debug(`/posts${id && "/"+id}`);
        const list = await getPosts(req.pool, {id, limit, offset});
        const [count] = await getPostsCount(req.pool);
        res.status(200).send({ list, count: count.count });
    }
    catch(e) {
        console.error(`/posts${id && "/"+id} | error =>`, e);
        res.status(500).send(e);
    }
});

router.get('/posts-list/:id?', async (req, res) => {
    const id = req.params.id;
    const limit = req.query.limit || 20;
    const offset = req.query.offset;

    try {
        debug(`/posts-list${id && "/"+id}`);
        const list = await getPosts(req.pool, {id, limit, offset});
        res.status(200).send({ list });
    }
    catch(e) {
        console.error(`/posts-list${id && "/"+id} | error =>`, e);
        res.status(500).send(e);
    }
});

router.get('/posts-count', async (req, res) => {
    try {
        debug(`/posts-count`);
        const [count] = await getPostsCount(req.pool);
        res.status(200).send({ count: count.count });
    }
    catch(e) {
        console.error(`/posts-count | error =>`, e);
        res.status(500).send(e);
    }
});

module.exports = router;