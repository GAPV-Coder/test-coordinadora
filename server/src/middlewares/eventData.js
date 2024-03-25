const addEventDataMiddleware = (req, res, next) => {
    const id_event = req.body.id_event;
    const id_user = req.body.id_user;

    req.body.id_event = id_event;
    req.body.id_user = id_user;s

    next();
};

export default addEventDataMiddleware;